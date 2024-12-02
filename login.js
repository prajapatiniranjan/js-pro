document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and credentials are correct
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        alert('Invalid email or password');
    }
});
