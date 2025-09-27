document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1) Greeting + Typewriter
     ========================= */
  let userName = localStorage.getItem("visitor_name");
  if (!userName) {
    userName = prompt("Masukkan nama kamu:");
    if (userName && userName.trim()) {
      userName = userName.trim();
      localStorage.setItem("visitor_name", userName);
    }
  }
  if (!userName || !userName.trim()) userName = "Guest";

  const typeEl = document.getElementById("typewriterName");
  const textToType = userName;
  let i = 0;
  const speed = 60;

  if (typeEl) {
    (function type() {
      if (i <= textToType.length) {
        typeEl.textContent = textToType.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    })();
  }

  /* ===================
     2) Form Validation
     =================== */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !phone || !message) { alert("Semua field wajib diisi!"); return; }
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) { alert("Email tidak valid!"); return; }
      if (!/^[0-9]+$/.test(phone)) { alert("Nomor telepon hanya boleh angka!"); return; }

      document.getElementById("result").innerHTML = `
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Pesan:</b> ${message}</p>
      `;

      if (typeEl && name) {
        typeEl.textContent = name;
        localStorage.setItem("visitor_name", name);
      }
    });
  }

  /* =========================================
     3) Mobile Hamburger + Active Link on View
     ========================================= */
  // Toggle mobile nav
  const btn = document.getElementById("navToggle");
  const mobile = document.getElementById("mobileNav");
  if (btn && mobile) {
    btn.addEventListener("click", () => {
      mobile.classList.toggle("hidden");
    });
    // auto close when clicking a link
    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobile.classList.add("hidden"));
    });
  }

  // Mark active link when section in view
  const links = Array.from(document.querySelectorAll("a.nav-link"));
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (el) => {
    links.forEach(l => l.classList.remove("active"));
    if (el) el.classList.add("active");
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`a.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) setActive(link);
    });
  }, { threshold: 0.55 });

  sections.forEach(sec => obs.observe(sec));

  // (Optional) Smooth scroll saat klik link navbar (desktop & mobile)
  links.forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(a);
    });
  });
});
