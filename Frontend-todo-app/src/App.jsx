import React, {useEffect, useState} from 'react'
import './App.css'

const addTodo = (todo, setTodoList) => {
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: todo.title, description: todo.description})
    }).then((response) => {
        console.log("Todo added");
        getTodo(setTodoList);
    })
}

const deleteTodo = (id, setTodoList) => {
    fetch("http://localhost:3000/todos/" + id, {method: "DELETE"}).then((response) => {
        console.log("Todo deleted");
        getTodo(setTodoList);
    })
}

const getTodo = (setTodoList) => {
    fetch("http://localhost:3000/todos", {method: "GET"}).then((response) => {
        response.json().then((data) => {
            setTodoList(data);
        })
    })
}

function App() {
    const [todo, setTodo] = useState({title: "", description: ""});
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        getTodo(setTodoList);
        setInterval(() => {
            getTodo(setTodoList)
        }, 1000)
    },[])

  return (
    <>
      <div id="mainArea">
        <h3>Todo app</h3>
        Title: <input type="text" onChange={e => setTodo({title: e.target.value, description: todo.description || null})}/><br/><br/>
        Description: <input type="text" onChange={e => setTodo({title: todo.title || null ,description: e.target.value})}/><br/><br/>
        <button onClick={() => {
            addTodo(todo, setTodoList)
            setTodo({ title: '', description: '' });
        }}>Add Todo</button><br/>
          <h1>TODOS</h1>
          {todoList.map((todo) => {
              return <RenderTodo title = {todo.title} description = {todo.description} setTodo = {setTodoList} id= {todo.id}></RenderTodo>
          })}
      </div>
    </>
  )
}

function RenderTodo(props) {
    return <div id = "eachTodo">
        title: {props.title}<br/>
        description: {props.description}<br/>
        <button onClick={() => deleteTodo(props.id, props.setTodo)}>Delete</button>
        <br/><br/>
    </div>
}

export default App
