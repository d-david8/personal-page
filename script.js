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
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formStatus").textContent =
    "Message ready to be sent (connect PHP SMTP here)";
});

