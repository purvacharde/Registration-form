const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Paste your MongoDB Atlas connection string here
mongoose.connect(
  "mongodb+srv://purvacharde0501_db_user:purvacharde05@cluster0.llzn1ai.mongodb.net/RegistrationDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.get('/home', (req, res) => {
  res.send('Server is running');
});

// Create Schema
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

// API: Receive Form Data
app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.json({ error: "Error saving to DB" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
