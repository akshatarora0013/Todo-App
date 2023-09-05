const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const todoSchema = new mongoose.Schema({})

const Todos = mongoose.model("Todos", todoSchema);

mongoose.connect('mongodb+srv://akshatarora0013:Ravi123Sapna@courseselling.9ueqmee.mongodb.net/todo-app', { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to mongoDB server");
})

app.use(bodyParser.json());
app.use(cors());                  // fixing cors error by telling the backend to accept request from anywhere

app.get("/todos", async(req, res) => {
    try {
        const todos = await Todos.find();
        res.json(todos);
    }
    catch (err){
        res.status(500).json({error: "error fetching todos"})
    }
})

app.post("/todos", async(req, res) => {
    try {
        const newTodo = new Todos({
            title: req.body.title,
            description: req.body.description
        })
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    }
    catch (err) {
        res.status(500).json({ error: "Error creating todo" });
    }

})

app.delete("/todos/:id", async(req, res) => {
    try{
        const deletedTodo = await Todos.findById(req.params.id);
        if(deletedTodo){
            Todos.deleteOne({ _id: deletedTodo._id });
            res.json(deletedTodo);
        }
        res.status(404).json({message: "Todo not found"})
    }
    catch (err){
        res.status(500).json({ error: "Error deleting todo" });
    }
})

// //  sending the html file here itself instead of opening it directly with will not lead to CORS error
// //  as the frontend and backend are coming from same url
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// })

app.listen(3000, () => {
    console.log("Server Started");
})