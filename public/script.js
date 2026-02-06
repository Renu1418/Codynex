console.log("Website loaded successfully");

const BASE_URL = "http://localhost:5000";

/* ---------------- CONTACT FORM ---------------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const message = contactForm.message.value;

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  });
}

/* ---------------- LOGIN FORM ---------------- */
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert("Login successful");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  });
}

/* ---------------- SIGNUP FORM ---------------- */
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  });
}

/* ---------------- AUTH BUTTON VISIBILITY ---------------- */
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const loginBtn = document.querySelector('.login-btn');
  const signupBtn = document.querySelector('.signup-btn');
  const logoutBtn = document.querySelector('.logout-btn');

  if (token) {
    loginBtn?.classList.add('hidden');
    signupBtn?.classList.add('hidden');
    logoutBtn && (logoutBtn.style.display = 'inline-block');

    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert("Logged out");
      window.location.href = "index.html";
    });
  } else {
    loginBtn?.classList.remove('hidden');
    signupBtn?.classList.remove('hidden');
    logoutBtn && (logoutBtn.style.display = 'none');
  }
});

/* ---------------- MODAL SAFE HANDLING ---------------- */
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modal-body");

if (modal && closeModal && modalBody) {
  document.querySelectorAll(".explore-card").forEach(card => {
    card.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
