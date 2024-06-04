from flask import Flask, request, render_template, redirect, url_for
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
from azure.storage.blob import ContentSettings
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'books.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    blob_name = db.Column(db.String(150), nullable=False)

with app.app_context():
    db.create_all()

# Azure Blob Storage configuration
connect_str = "DefaultEndpointsProtocol=https;AccountName=openlin2;AccountKey=oElwFYxG4aJnZsk+hh3cvveZAWLL6AJ1t0sU2KqRUOb8z8zHh6rCwd3yH+ufnivwRzuTvWMO9R8J+ASt9xwExA==;EndpointSuffix=core.windows.net"
container_name = "books"
blob_service_client = BlobServiceClient.from_connection_string(connect_str)
container_client = blob_service_client.get_container_client(container_name)

def upload_pdf(file, blob_name, content_type):
    blob_client = container_client.get_blob_client(blob_name)
    blob_client.upload_blob(file, overwrite=True, content_settings=ContentSettings(content_type=content_type))
    return blob_client.url

def get_blob_details():
    blob_details = []
    blobs = container_client.list_blobs()
    for blob in blobs:
        sas_token = generate_blob_sas(
            account_name="openlin2",
            container_name=container_name,
            blob_name=blob.name,
            account_key="oElwFYxG4aJnZsk+hh3cvveZAWLL6AJ1t0sU2KqRUOb8z8zHh6rCwd3yH+ufnivwRzuTvWMO9R8J+ASt9xwExA==",
            permission=BlobSasPermissions(read=True),
            expiry=datetime.utcnow() + timedelta(hours=1)
        )
        blob_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{container_name}/{blob.name}?{sas_token}"
        book = Book.query.filter_by(blob_name=blob.name).first()

        if book:
        #     cover_image_url = None
        #     if book.cover_image_blob_name:
        #         cover_image_sas_token = generate_blob_sas(
        #             account_name=blob_service_client.account_name,
        #             container_name=container_name,
        #             blob_name=book.cover_image_blob_name,
        #             account_key= "oElwFYxG4aJnZsk+hh3cvveZAWLL6AJ1t0sU2KqRUOb8z8zHh6rCwd3yH+ufnivwRzuTvWMO9R8J+ASt9xwExA==",
        #             permission=BlobSasPermissions(read=True),
        #             expiry=datetime.utcnow() + timedelta(hours=1)
        #         )
                # cover_image_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{container_name}/{book.cover_image_blob_name}?{cover_image_sas_token}"
              blob_details.append({'title': book.title, 'description': book.description, 'url': blob_url, 'blob_name': blob.name})
    return blob_details

@app.route('/')
def index():
    blob_details = get_blob_details()
    return render_template('index.html', blob_details=blob_details)

@app.route('/uploadbooks', methods=['POST'])
def uploadbooks():
    title = request.form['title']
    description = request.form['description']
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file:
        blob_name = file.filename
        # upload_pdf(file, blob_name)
        blob_client = container_client.get_blob_client(blob_name)
        # blob_client.upload_blob(cover_image, overwrite=True, content_settings=ContentSettings(content_type='image/jpeg'))
        blob_client.upload_blob(file, overwrite=True, content_settings=ContentSettings(content_type='application/pdf'))
        new_book = Book(title=title, description=description, blob_name=blob_name)
        db.session.add(new_book)
        db.session.commit()
        return redirect(url_for('books'))
    return redirect(request.url)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/books')
def books():
    blob_details = get_blob_details()
    return render_template('Books.html', blob_details=blob_details)

@app.route('/upload')
def upload():
    blob_details = get_blob_details()
    return render_template('upload.html', blob_details=blob_details)

@app.route('/delete/<blob_name>', methods=['POST'])
def delete(blob_name):
    print(f"Attempting to delete blob: {blob_name}")
    book = Book.query.filter_by(blob_name=blob_name).first()
    if book:
        db.session.delete(book)
        db.session.commit()
    else:
        print(f"No book found in database with blob_name: {blob_name}")
    
    blob_client = container_client.get_blob_client(blob_name)
    try:
        blob_client.delete_blob()
        print(f"Blob {blob_name} deleted successfully.")
    except Exception as e:
        print(f"Error deleting blob: {e}")
    
    return redirect(url_for('books'))

if __name__ == '__main__':
    app.run(debug=True)
