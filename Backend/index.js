const express = require('express');
const app = express();
const port = 3002;
const zod = require('zod');

const mongoose  = require('mongoose');
const {User, Todo} = require('./schema');

app.use(express.json());

mongoose.connect("mongodb+srv://santoshpant613:XMjtBbCptGekxxkX@cluster0.eoa6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todoapp");

app.get("/", (req, res)=>{
    res.send("Welcome to Backend World");
})


function checkAuthDetails(req, res, next){
   try{
    const loginData = zod.object({
        email: zod.string().email("Please give valid email address"),
        password: zod.string().min(6, "password should be at least 6 characters")
    })

    const userGaveMeThisData = req.body;

    loginData.parse(userGaveMeThisData);
    next();
   } catch(error){
    return res.send(error.errors.map((e) => e.message).join(", "));
   }
}

//try catch

app.post("/login", checkAuthDetails,  async (req, res)=>{
   try{
    const email = req.body.email;
   const password = req.body.password;

   const findUser = await User.findOne({email: email, password: password});

   if(!findUser){
    return res.send("No User found");
   }

   return res.send("Success");
   } catch(error){
    return res.send("Sorry, something went wrong, try again");
   }

})

app.post("/signup", checkAuthDetails, async (req, res)=>{
   try{
    const email = req.body.email;
    const password = req.body.password;

    const newPerson = new User({email: email, password: password});

    await newPerson.save();

    res.send("Successfully registered");
   } catch(error){
    res.send("Sorry, something went wrong, try again");
   }
})

app.post("/maketodo", async (req, res)=>{
    // const title = req.body.title;
    // const description  = req.body.description;

    const {title, description}  = req.body;

    const newTodo = new Todo({title: title, description: description, isDone: false});
    await newTodo.save();
    return res.send("Successfully added new todo");
})

app.post("/deletetodo", async (req, res)=>{
    const id = req.body.id;

    await Todo.deleteOne({_id: id});
    return res.send("Deleted Successfully");
})

app.post("/updatetodo", async (req, res)=>{
    const {title, description, id} = req.body;

    await Todo.updateOne({_id: id}, {title: title, description: description});
    return res.send("Updated :))");
})


app.post("/markdone", async (req, res)=>{
const id = req.body.id;

await Todo.updateOne({_id: id}, {isDone: true});
return res.send("Marked as Done :))")

})


app.get("/gettodos", async (req, res)=>{

    const allTodos = await Todo.find({});
    return res.json({
        "todos": allTodos,
        "message": "All Todos are returned to user"
    })
})

app.listen(port, ()=>{
    console.log("Healthy Server");
    
})



//CRUD - Creating, Reading, Updating, and Deleting
//Middlewares