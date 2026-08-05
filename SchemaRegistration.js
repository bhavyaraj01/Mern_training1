const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  }, 
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password must be at least 5 characters'],
    maxlength: [15, 'Password must be at most 15 characters']
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
