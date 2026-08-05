const express=require('express');
const mongoose = require('mongoose');
const registration=require('./SchemaRegistration');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const app=express();  
app.use(express.json());
const joi=require('joi');

const schema=joi.object({
  name:joi.string().min(2).max(100).required(),
  email:joi.string().email().required(),
  password:joi.string().min(6).required()
});

mongoose.connect('mongodb+srv://bhavyarajsinghjhala40_db_user:Bhamsa%40004@cluster0.rm2dtsl.mongodb.net/school')
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));
//try catch
app.post('/students', async (req, res) => {





try{
      const {name,email,password}=req.body;
      const {error,value}=schema.validate(req.body);
      if(error){
        return res.status(400).send(error.details[0].message);
      }
      const userexist=await registration.findOne({email});

      if(userexist){
        return res.status(400).send("user already exist");
      };
      
      const hashedpassword=await bcrypt.hash(password,10);


      console.log("hashed_pass",hashedpassword);
      const newuser={
        name:name,
        email:email,
        password:hashedpassword
      }
      await registration.create(newuser);
      res.status(201).send("user created successfully");
}
catch (err) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
}

//validation check
//user check(exist or not in db)
//hash password
//saved in db
//return response
})

app.post('/login', async (req, res) => {
  try {
  validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
  });
  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;
    console.log("req.body", req.body);
  }
      
  const user = await registration.findOne({ email: value.email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(value.password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, 'TechnoNJR', { expiresIn: '1h' });
  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
} catch (err) {
  res.status(500).json({ error: 'Internal server error' });
}
});

app.post('/logout', (req, res) => {

  // Invalidate the token on the client side (e.g., remove it from local storage)
    req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }})
  res.status(200).send('Logged out successfully');
})

app.listen(3000, () => console.log('Server running on port 3000'));

