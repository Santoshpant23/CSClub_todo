const express = require('express');
const app = express();
const port = 3002;

const mongoose  = require('mongoose');
const {User, Todo} = require('./schema');

app.use(express.json());

mongoose.connect("mongodb+srv://santoshpant613:XMjtBbCptGekxxkX@cluster0.eoa6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todoapp");

app.get("/", (req, res)=>{
    res.send("Welcome to Backend World");
})

app.post("/login", async (req, res)=>{
   const email = req.body.email;
   const password = req.body.password;

   if(!email){
    return res.send("Email Cannot be empty");
   }

   if(!password){
   return  res.send("Password is required");
   }

   const findUser = await User.findOne({email: email, password: password});
   if(!findUser){
    return res.send("No User found");
   }

   return res.send("Success");

})

app.post("/signup", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const newPerson = new User({email: email, password: password});
    await newPerson.save();
    res.send("Successfully registered");
})

app.post("/maketodo", async (req, res)=>{
    // const title = req.body.title;
    // const description  = req.body.description;

    const {title, description}  = req.body;

    const newTodo = new Todo({title: title, description: description, isDone: false});
    await newTodo.save();
    return res.send("Successfully added new todo");
})

app.post("/deletetodo", (req, res)=>{
    res.send("I am deletetodo endpoint");
})

app.post("/updatetodo", (req, res)=>{
    res.send("I am updatetodo endpoint");
})



app.listen(port, ()=>{
    console.log("Healthy Server");
    
})