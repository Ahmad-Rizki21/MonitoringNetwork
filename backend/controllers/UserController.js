const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fungsi untuk Register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
      return res.status(400).json({ msg: "Username dan password tidak boleh kosong" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({
      username: username,
      password: hashPassword
    });
    res.json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // Asumsikan kita mendapatkan userId dari token yang sudah terverifikasi
  // Untuk sekarang, kita akan hardcode ID user 1 (admin) untuk tes
  // Nantinya ini akan diganti dengan middleware autentikasi
  const userId = 1; 

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Password lama salah" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashPassword });

    res.json({ msg: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// Fungsi untuk Login
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Password Salah" });

        // Buat token JWT
        const userId = user.id;
        const username = user.username;
        const accessToken = jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET || 'your_secret_key', {
            expiresIn: '1h' // Token berlaku selama 1 jam
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};