document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutformbutton');
    const deleteButton = document.getElementById('deletebutton');
    const signupButton = document.getElementById('loginformbutton');
    const uploadButton = document.getElementById('uploadbutton');
    const welcomeText = document.getElementById('textupload');
    const usernameDisplay = localStorage.getItem("username");
    const profilePicture = document.getElementById('profilePicture');
    const profilePictureInput = document.getElementById('profilePictureInput');
    const changeProfilePictureButton = document.getElementById('changeProfilePictureButton');
    const usernameInput = document.getElementById('username');
    const changeUsernameButton = document.getElementById('changeUsernameButton');
    const uploadedBooksDiv = document.getElementById('uploadedBooks');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting the default way

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');
            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");
            const username = localStorage.getItem("username");

            if (email === 'santhosh@gmail.com' && password === 'admin123') {
                // Simulate a successful login
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/books';
                return;
            }

            // Placeholder for actual authentication logic
            if (storedEmail === email && storedPassword === password) {
                alert('Welcome ' + username);
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/books';
            } else {
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.style.display = 'block';
            }
        });
    }

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // Hide the signup button and show relevant buttons if user is logged in
        if (signupButton) signupButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (uploadButton) uploadButton.style.display = 'block';
        if (deleteButton) deleteButton.style.display = 'inline';
        if (welcomeText) {
            welcomeText.innerHTML = '<h1>Welcome ' + '<span class="usernamecolor">' + usernameDisplay + '</span><br>You can <a class="uploadbuttonstyle" href="/upload">upload</a> books</h1>';
        }
    } else {
        if (logoutButton) logoutButton.style.display = 'none';
        if (deleteButton) deleteButton.style.display = 'none';
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting the default way
            const regusername = document.getElementById('name').value;
            const regemail = document.getElementById('reg-email').value;
            const regpassword = document.getElementById('reg-password').value;
            const conpass = document.getElementById('conpass').value;
            const regerrorMessage = document.getElementById('register-error-message');

            if (regusername && regemail && regpassword && conpass) {
                if (regpassword === conpass) {
                    localStorage.setItem("username", regusername);
                    localStorage.setItem("email", regemail);
                    localStorage.setItem("password", regpassword);

                    alert('Registration successful');
                    window.location.href = '/login';
                } else {
                    regerrorMessage.textContent = 'Passwords do not match';
                    regerrorMessage.style.display = 'block';
                }
            } else {
                regerrorMessage.textContent = 'Please fill in all fields';
                regerrorMessage.style.display = 'block';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.setItem('isLoggedIn', 'false');
            window.location.href = '/books';
        });
    }

    // Profile Page Functionality
    if (profilePicture) {
        const storedProfilePicture = localStorage.getItem('profilePicture');
        if (storedProfilePicture) {
            profilePicture.src = storedProfilePicture;
        }

        changeProfilePictureButton.addEventListener('click', function () {
            profilePictureInput.click();
        });

        profilePictureInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePicture.src = e.target.result;
                    localStorage.setItem('profilePicture', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (usernameInput) {
        if (usernameDisplay) {
            usernameInput.value = usernameDisplay;
        }

        changeUsernameButton.addEventListener('click', function () {
            const newUsername = usernameInput.value;
            localStorage.setItem('username', newUsername);
            alert('Username changed to ' + newUsername);
        });
    }

    if (uploadedBooksDiv) {
        const uploadedBooks = JSON.parse(localStorage.getItem('uploadedBooks')) || [];
        uploadedBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            bookDiv.textContent = `${book.title} - Uploaded on ${new Date(book.uploadedAt).toLocaleString()}`;
            uploadedBooksDiv.appendChild(bookDiv);
        });
    }
});
