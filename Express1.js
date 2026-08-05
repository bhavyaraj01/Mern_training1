const express=require("express");

const app=express();
const port=3000;

app.use("/home",(req,res)=>{
    res.send("Hello this is Home page")
})

app.use("/about",(req,res)=>{
    res.send("Hello this is about page")
})
app.use("/products/laptops",(req,res)=>{
    res.send("Hello this is laptops page")
})
app.use("/products",(req,res)=>{
    res.send("Hello this is products page")
})

app.get("/students",(req,res)=>{
    res.send("this is students data")
})
app.use("/",(req,res)=>{
    res.send("Hello this is my first express api")
}
)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);

})