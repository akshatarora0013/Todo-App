const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());                  // fixing cors error by telling the backend to accept request from anywhere

app.get("/todos", (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if(err){
            throw err;
        }
        res.json(JSON.parse(data));
    })
})

app.post("/todos", (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 10000),
        title: req.body.title,
        description: req.body.description
    }
    fs.readFile("todos.json", "utf8", (err, data) => {
        if(err){
            throw error;
        }
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), "utf8", (err) => {
            if(err){
                throw err;
            }
            res.status(201).json(newTodo);
        })
    })
})

app.delete("/todos/:id", (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if(err){
            throw err;
        }
        const todo = JSON.parse(data);
        var index = todo.findIndex(t => t.id === parseInt(req.params.id));
        if(index === -1){
            res.status(401).send();
        }
        else{
            todo.splice(index, 1);
            fs.writeFile("todos.json", JSON.stringify(todo), "utf8", (err) => {
                if(err){
                    throw err;
                }
                res.status(201).send();
            })
        }
    })
})

// //  sending the html file here itself instead of opening it directly with will not lead to CORS error
// //  as the frontend and backend are coming from same url
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// })

app.listen(3000, () => {
    console.log("Server Started");
})