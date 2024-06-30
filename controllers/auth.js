const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkEmail = await Auth.findOne({ email });
    const checkUser = await Auth.findOne({ username });

    if (checkEmail) return res.status(500).json({ message: "Email Kullanılmakta!" });
    if (checkUser) return res.status(500).json({ message: "Kullanıcı Adı Kullanılmakta!" });

    if (password.length < 6)
      res.status(500).json({ message: "Parolanız 6 Karakterden Büyük Olmalı" });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({ username, email, password:  passwordHash });

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) return res.status(500).json({ message: "Email Bulunamadı!" });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(500).json({ message: "Parola Yanlış!" });
    const userToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      user,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
