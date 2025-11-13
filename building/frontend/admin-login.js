document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('adminLoginForm');
  const submitButton = document.getElementById('adminLoginButton');
  const errorMessage = document.getElementById('loginError');

  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (errorMessage) {
      errorMessage.hidden = true;
    }

    const email = form.email.value.trim();
    const password = form.password.value;

    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      window.location.href = '/admin.html';
    } catch (error) {
      if (errorMessage) {
        errorMessage.hidden = false;
      }
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    }
  });
});

