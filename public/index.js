const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (use env variable when deploying)
mongoose.connect(
  "mongodb+srv://purvacharde0501_db_user:purvacharde05@cluster0.llzn1ai.mongodb.net/RegistrationDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("MongoDB connection error:", err);
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

// ✔ FIXED → Render needs dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
