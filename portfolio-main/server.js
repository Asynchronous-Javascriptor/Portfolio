const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    fs.appendFileSync("error.log", new Date().toISOString() + " Email error: " + error.message + "\n");
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(PORT, () => {
  fs.writeFileSync("server_status.txt", "RUNNING on port " + PORT);
});

server.on("error", (err) => {
  fs.writeFileSync("server_status.txt", "ERROR: " + err.message);
});

process.on("uncaughtException", (err) => {
  fs.writeFileSync("server_status.txt", "CRASH: " + err.stack);
});
