document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting the default way
			
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');
            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");
			const username = localStorage.getItem("username");


            if (email === 'santhosh@gmail' && password === 'admin123') {
                // Simulate a successful login
                window.location.href = '/books';
				sessionStorage.setItem('isLoggedIn', 'true');

                return;
            }

            // Placeholder for actual authentication logic
            if (storedEmail === email && storedPassword === password) {
                alert('Welcome '+ username);
                // Store login status in sessionStorage
                window.location.href = '/books';
				sessionStorage.setItem('isLoggedIn', 'true');

            } else {
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.style.display = 'block';
            }
        });
    }
});



//hide signup button
document.addEventListener('DOMContentLoaded', function () {
	// Check if the user is logged in
	if (sessionStorage.getItem('isLoggedIn') === 'true') {
		// Hide the signup button
		document.getElementById('loginformbutton').style.display = 'none';
		document.getElementById('logoutformbutton').style.display = 'block';
		document.getElementById('uploadbutton').style.display = 'block';
		document.getElementById('textupload').innerHTML = '<h1>Upload Books To Read</h1>'

		
	}
});

//register

if (document.getElementById('registerForm') != null) {
	document.getElementById('registerForm').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent the form from submitting the default way

		 regusername = document.getElementById('name').value;
		 regemail = document.getElementById('reg-email').value;
		 regpassword = document.getElementById('reg-password').value;
		 conpass=document.getElementById('conpass').value;
		 regerrorMessage = document.getElementById('register-error-message');
		 
		 localStorage.setItem("username",regusername);
		 localStorage.setItem("email",regemail);
		 localStorage.setItem("password",regpassword);
			storedemail=localStorage.getItem("email");
			storedPassword=localStorage.getItem("password");
			storedusername=localStorage.getItem("username")
			
		// Placeholder for actual registration logic
	
		if (regusername && regemail && regpassword && conpass) {
			if (regpassword === conpass){
				alert('Registration successful');
			// Redirect to the login page or perform other actions upon successful registration
				window.location.href = '/login';

			}else {
				regerrorMessage.textContent = 'Passwords Does Not Match';
				regerrorMessage.style.display = 'block'; 
			}

		} else {
			regerrorMessage.textContent = 'Please fill in all fields';
			regerrorMessage.style.display = 'block';
		}
	});

}

// logout function

document.getElementById('logoutformbutton').addEventListener('click', function(event) {
	// Clear login status
	sessionStorage.removeItem('isLoggedIn');
	// Redirect to login page
	window.location.href = '/';
});


//working


// if ( document.getElementById('loginForm') != null ) {
// 	document.getElementById('loginForm').addEventListener('submit', function(event) {
// 	event.preventDefault(); // Prevent the form from submitting the default way

// 	 email = document.getElementById('email').value;
// 	 password = document.getElementById('password').value;
// 	 errorMessage = document.getElementById('error-message');
// 	 storedUserName=localStorage.getItem("email");
// 	storedPassword=localStorage.getItem("password");
// 	if (email === '' && password === '') {
// 		alert('Login successful');
// 		// Redirect to the homepage or perform other actions upon successful login
// 		window.location.href = 'login.html';
// 		sessionStorage.setItem('isLoggedIn', 'true');

		
// 		return;
// 	} 
// 	// Placeholder for actual authentication logic
// 	if (storedUserName === email && storedPassword === password) {
// 		alert('signin successful');
// 		// Redirect to the homepage or perform other actions upon successful login
// 		window.location.href = 'index.html';
// 		sessionStorage.setItem('isLoggedIn', 'true');

// 	} else {
// 		errorMessage.textContent = 'Invalid username or password';
// 		errorMessage.style.display = 'block';
// 	}
	
// });

// }

// //register
// if (document.getElementById('registerForm') != null) {
// document.getElementById('registerForm').addEventListener('submit', function(event) {
// 	event.preventDefault(); // Prevent the form from submitting the default way

// 	 regusername = document.getElementById('name').value;
// 	 regemail = document.getElementById('reg-email').value;
// 	 regpassword = document.getElementById('reg-password').value;
// 	 regerrorMessage = document.getElementById('register-error-message');
	 
// 	 localStorage.setItem("email",regemail);
// 	 localStorage.setItem("password",regpassword);
// 		storedUserName=localStorage.getItem("email");
// 		storedPassword=localStorage.getItem("password");
		
// 	// Placeholder for actual registration logic
// 	if (regusername && regemail && regpassword) {
// 		alert('Registration successful');
// 		// Redirect to the login page or perform other actions upon successful registration
// 		window.location.href = 'login.html';
// 	} else {
// 		regerrorMessage.textContent = 'Please fill in all fields';
// 		regerrorMessage.style.display = 'block';
// 	}
// });

// }