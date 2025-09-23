document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');

        if (name.length < 2) {
            showError(nameInput, nameError, 'Please enter your full name (at least 2 characters)');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showError(emailInput, emailError, 'Email address is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');

        if (message.length < 10) {
            showError(messageInput, messageError, 'Please enter your message (minimum 10 characters)');
            return false;
        } else {
            showSuccess(messageInput, messageError);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.style.display = 'none';
    }

    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');

        if (input.classList.contains('error')) {
            input.classList.remove('error');
            errorElement.style.display = 'none';
        }
    }

    // Real-time validation event listeners
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => clearError('name'));

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => clearError('email'));

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => clearError('message'));

    // Character counter for message
    messageInput.addEventListener('input', function () {
        const charCount = this.value.length;
        const messageError = document.getElementById('messageError');

        if (charCount > 0 && charCount < 10) {
            messageError.textContent = `Please enter at least ${10 - charCount} more characters`;
            messageError.style.display = 'block';
            messageError.style.color = '#f39c12';
        } else if (charCount >= 10) {
            clearError('message');
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        // Validate all fields before submission
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If any validation fails, prevent submission
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            e.preventDefault();

            // Scroll to first error
            const firstError = form.querySelector('.form-control.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div>Sending...';
        submitBtn.disabled = true;

        // Let Formspree handle the actual submission
    });

    // Handle successful form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        successMessage.classList.add('show');
        form.reset();

        // Clear all validation states
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('error', 'success');
        });

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto-hide success message after 10 seconds
    if (successMessage.classList.contains('show')) {
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 10000);
    }

    // Add smooth animations on load
    setTimeout(() => {
        document.querySelector('.contact-info').style.animation = 'slideInLeft 0.6s ease-out';
        document.querySelector('.contact-form').style.animation = 'slideInRight 0.6s ease-out';
    }, 100);
});