document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const repasswordInput = document.getElementById('repassword');
    const registerButton = document.getElementById('button');

    registerButton.addEventListener('click', function(e) {
        e.preventDefault();

        resetErrors();
        const isValid = validateForm();

        if (isValid) {
            const userData = {
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.some(user => user.email === userData.email)) {
                showError(emailInput, "Email already registered");
            } else {
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 1500);
            }

            localStorage.setItem("name", nameInput.value);
        }
    });

    function validateForm() {
        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, "Name is required");
            isValid = false;
        }
        if (!surnameInput.value.trim()) {
            showError(surnameInput, "Surname is required");
            isValid = false;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, "Invalid email format");
            isValid = false;
        }
        if (!passwordInput.value) {
            showError(passwordInput, "Password is required");
            isValid = false;
        }
        if (!repasswordInput.value) {
            showError(repasswordInput, "Please re-enter your password");
            isValid = false;
        } else if (passwordInput.value !== repasswordInput.value) {
            showError(repasswordInput, "Passwords do not match");
            isValid = false;
        }

        return isValid;
    }

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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
