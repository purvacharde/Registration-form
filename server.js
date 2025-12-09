const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URL || "mongodb+srv://purvacharde0501_db_user:purvacharde05@cluster0.llzn1ai.mongodb.net/RegistrationDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  address: String,
  contact: String,
  email: String,
  occupation: String,
  age: String,
  gender: String,
  civilStatus: String,
  citizenship: String,
  height: String,
  weight: String,
  religion: String,
  language: String,
  fatherName: String,
  fatherOccupation: String,
  motherName: String,
  motherOccupation: String,
  emergencyContactPerson: String,
  emergencyContactNumber: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// API
app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.json({ error: "Error saving to DB" });
  }
});

// Send index.html for all other routes (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
