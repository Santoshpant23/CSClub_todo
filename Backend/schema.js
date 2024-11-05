const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("users", userSchema);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    isDone: Boolean
})

const Todo = mongoose.model("todos", todoSchema);

module.exports = {User, Todo};