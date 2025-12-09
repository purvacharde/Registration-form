const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Connect MongoDB (using environment variable)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test Route
app.get("/home", (req, res) => {
  res.send("Server is running");
});

// Schema
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

// POST API
app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.json({ error: "Error saving to DB" });
  }
});

// ✔ Important: Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
