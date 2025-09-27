// Greeting - isi nama otomatis (Welcome Message)
let userName = prompt("Masukkan nama kamu:");
if (userName) {
  document.getElementById("welcome").innerText = `Hi ${userName}, Welcome to Website`;
}

// Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validasi sederhana
  if (!name || !email || !phone || !message) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    alert("Email tidak valid!");
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    alert("Nomor telepon hanya boleh angka!");
    return;
  }

  // Tampilkan hasil
  document.getElementById("result").innerHTML = `
    <p><b>Nama:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Pesan:</b> ${message}</p>
  `;
});
