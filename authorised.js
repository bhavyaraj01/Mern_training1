const express=require('express');
const  app=express();

app.use('/admin/users',(req,res,next)=>{
    const token=321;

    if(token==123){
        next();
    }
    res.send('Unauthorized');
})

module.exports=app;

