const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path"); 
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const TELEGRAM_BOT_TOKEN = "7314362724:AAGObx-oh4d0sz8MsyRdB0W6qwLHqb3XY58";
const TELEGRAM_CHAT_ID = "6450551010";

app.post("/order", async (req, res) => {
  const { drink, code } = req.body;
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: `🧃 Pesanan Baru Masuk:\nMinuman: ${drink}\n🔐 Kode Penukaran: ${code}`
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Gagal kirim ke Telegram:", error.message);
    res.sendStatus(500);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// code page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
  });

app.get("/menu", (req, res) => {
  res.sendFile(__dirname + "/views/menu.html");
});

app.get("/topup", (req, res) => {
    res.sendFile(__dirname + "/views/topup.html");
  });

  app.get("/history", (req, res) => {
    res.sendFile(__dirname + "/views/history.html");
  });

  app.get("/promo", (req, res) => {
    res.sendFile(__dirname + "/views/promo.html");
  });

  app.get("/makanan", (req, res) => {
    res.sendFile(__dirname + "/views/makanan.html");
  });

app.get("/convert", (req, res) => {
  res.sendFile(__dirname + "/views/convert.html");
});

  app.get("/location", (req, res) => {
    res.sendFile(__dirname + "/views/location.html");
  });

app.get("/404", (req, res) => {
  res.sendFile(__dirname + "/views/404.html");
});

// Middleware 404: Halaman tidak ditemukan
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/convert", (req, res) => {
  const { amount, from_wallet, to_wallet, wallet_number, sender_number } = req.body;

  const message = `
💱 Permintaan Convert E-Wallet
Jumlah: Rp${amount}
Dari: ${from_wallet}
Ke: ${to_wallet}
Nomor Tujuan: ${wallet_number}
Nomor Pengirim: ${sender_number}
  `;

  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  });

  res.sendStatus(200);
});

