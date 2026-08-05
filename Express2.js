const express=require('express');
const  app=express();

const authorization=require('./authorised');



app.use("/admin",authorization);

app.get('/admin/users',(req,res,next)=>{
    res.send('this is admin users');
})

app.use('/admin',(req,res,next)=>{
    res.send('this is admin page');
})




const port=3000;

app.listen(port,()=>{
   console.log(`server is listening on port ${port}`);    
})
