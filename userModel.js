const express = require('express');
const mongoose = require('mongoose');
const Student = require('./student'); // import schema

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://bhavyarajsinghjhala40_db_user:Bhamsa@004@cluster0.rm2dtsl.mongodb.net/school')
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

// Routes
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);  
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.listen(3000, () => console.log('Server running on port 3000'));
