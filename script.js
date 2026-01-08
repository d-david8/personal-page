// ===== THEME TOGGLE =====
const toggle = document.getElementById("themeToggle");
const body = document.body;
const logo = document.getElementById("logo");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  toggle.textContent = "☀️";
  logo.src = "img/logo-light.png";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  logo.src = isLight ? "img/logo-light.png" : "img/logo-dark.png";
  toggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ===== DYNAMIC YEAR IN FOOTER =====
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===== LOGO CLICK TO TOP & REFRESH =====
document.getElementById('logo').addEventListener('click', function(e) {
  e.preventDefault(); 
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
});


// ===== SCROLL ANIMATIONS =====
const slides = document.querySelectorAll(".slide-up");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

slides.forEach(el => observer.observe(el));

// ===== CONTACT FORM (placeholder logic) =====

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById("formStatus");

    const formData = new FormData();
    formData.append("from", 'dan');
    formData.append("to", "d_david8@yahoo.com");
    formData.append("subject", "New contact form submission d-david8.ro");

    const bodyHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Submission</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #e0f2ff; /* albastru deschis fundal */
                color: #1e293b;
                margin: 0;
                padding: 0;
                font-size: 16px; /* text mai mare */
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                padding: 30px;
            }
            h2 {
                color: #0ea5e9;
                margin-bottom: 20px;
                font-size: 24px;
            }
            p {
                line-height: 1.8;
                margin: 10px 0;
                font-size: 18px; /* text mai mare */
            }
            .label {
                font-weight: bold;
                color: #0ea5e9;;
            }
            .message {
                background-color: #e0f2fe;
                padding: 15px;
                border-radius: 6px;
                margin-top: 5px;
                white-space: pre-wrap;
                font-size: 18px; /* text mai mare */
            }
            a {
                color: #0ea5e9;;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New contact form submission</h2>
            <p><span class="label">Name:</span> ${form.name.value}</p>
            <p><span class="label">Email:</span> <a href="mailto:${form.email.value}">${form.email.value}</a></p>
            <p><span class="label">Message:</span></p>
            <div class="message">${form.message.value.replace(/\n/g, "<br>")}</div>
        </div>
    </body>
    </html>
    `;

    formData.append("body", bodyHtml);
    try {
        const response = await fetch("https://www.d-david8.ro/api/send-email.php", {
            method: "POST",
            headers: {
                "X-API-KEY": "akdjfhg234234jkhg23423"
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            status.textContent = "Message sent successfully ✔️";
            status.className = "text-green-600";
            form.reset();
        } else {
            status.textContent = result.error || "Failed to send message ❌";
            status.className = "text-red-600";
        }
    } catch (err) {
        status.textContent = "Server error. Please try again later.";
        status.className = "text-red-600";
    }
});