document.getElementById('indexForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation for password matching
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Save user data to localStorage (Simulate registration)
    const userData = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(userData));

    alert('Sign up successful! Please log in.');
    window.location.href = '/login.html'; // Redirect to login page after successful sign up
});
