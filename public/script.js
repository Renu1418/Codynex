console.log("Website loaded successfully");

const BASE_URL = "http://localhost:5000";


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        try {

            const res = await fetch(`${BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.msg || "Message sent successfully");
                contactForm.reset();
            } else {
                alert(data.message || "Failed to submit");
            }

        } catch (err) {

            console.error("Contact form error:", err);
            alert("Failed to submit. Please try again.");

        }

    });

}


/* =========================================================
   LOGIN FORM
========================================================= */

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;

        try {

            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            if (res.ok) {

                localStorage.setItem("token", data.token);

                alert("Login successful");

                window.location.href = "index.html";

            } else {

                alert(data.message || "Login failed");

            }

        } catch (err) {

            console.error("Login error:", err);
            alert("Login error. Please try again.");

        }

    });

}


/* =========================================================
   SIGNUP FORM
========================================================= */

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = signupForm.name.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value;
        const confirmPassword = signupForm.confirmPassword.value;


        /* Password validation */

        if (password !== confirmPassword) {

            alert("Passwords do not match");
            return;

        }


        try {

            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (res.ok) {

                alert("Signup successful");

                window.location.href = "login.html";

            } else {

                alert(data.message || "Signup failed");

            }

        } catch (err) {

            console.error("Signup error:", err);
            alert("Signup error. Please try again.");

        }

    });

}


/* =========================================================
   AUTH BUTTON VISIBILITY
========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const logoutBtn = document.querySelector(".logout-btn");


    /* ---------------- LOGGED IN ---------------- */

    if (token) {

        loginBtn?.classList.add("hidden");

        signupBtn?.classList.add("hidden");

        logoutBtn?.classList.remove("hidden");


        /* Logout */

        logoutBtn?.addEventListener("click", () => {

            localStorage.removeItem("token");

            alert("Logged out");

            window.location.href = "index.html";

        });

    }


    /* ---------------- NOT LOGGED IN ---------------- */

    else {

        loginBtn?.classList.remove("hidden");

        signupBtn?.classList.remove("hidden");

        logoutBtn?.classList.add("hidden");

    }

});