// =============================================
//  auth.js — Email Login & Logout
//  MUJ CabShare
//
//  Validates @muj.manipal.edu email format,
//  then lets the user straight in.
// =============================================

let currentUser = null;

function login() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const err   = document.getElementById('email-error');

  if (!email) {
    err.textContent = '⚠️ Please enter your college email.';
    err.classList.add('show');
    return;
  }

  if (!email.endsWith('@muj.manipal.edu')) {
    err.textContent = '⚠️ Only @muj.manipal.edu emails are allowed.';
    err.classList.add('show');
    return;
  }

  err.classList.remove('show');
  currentUser = { email };

  document.getElementById('user-email-display').textContent = email.split('@')[0];
  document.getElementById('form-email-display').textContent = email;

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').classList.add('visible');

  document.getElementById('inp-date').min = new Date().toISOString().split('T')[0];

  renderStats();
  renderRides();
  showToast("✅ Welcome! You're in.");
}

function logout() {
  currentUser = null;
  document.getElementById('login-email').value = '';
  document.getElementById('email-error').classList.remove('show');
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-screen').style.display = 'flex';
}
