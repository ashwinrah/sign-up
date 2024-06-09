const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementsByName('name')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const confirmPassword = document.getElementsByName('confirm-password')[0].value;

    if (password!== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Send request to PHP script to store user data in database
    fetch('signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
   .then(response => response.json())
   .then(data => {
        if (data.success) {
            alert('Sign up successful!');
        } else {
            alert('Error signing up');
        }
    })
   .catch(error => {
        console.error(error);
    });
});

signinForm.addEventListener  ('submit', (e) => {
    e.preventDefault();
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    // Send request to PHP script to authenticate user
    fetch('signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
   .then(response => response.json())
   .then(data => {
        if (data.success) {
            // Get customer information from database
            fetch('get_customer_info.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
           .then(response => response.json())
           .then(data => {
                const customerInfo = data.customer_info;
                // Send customer information to Gmail account