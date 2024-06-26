document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('button');

    loginButton.addEventListener('click', function(e) {
        e.preventDefault();

        resetErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            showError(emailInput, "Email is required");
            return;
        }
        if (!password) {
            showError(passwordInput, "Password is required");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("username", user.name);
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                window.location.href = './index.html';  // Redirect to home page
            }, 1500);
        } else {
            showError(passwordInput, "Invalid email or password");
        }
    });

    function showError(inputElement, message) {
        const parent = inputElement.parentElement;
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        parent.appendChild(errorElement);
        inputElement.classList.add('error');
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => el.remove());
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('error'));
    }
});
