import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function ShowTodo() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    axios.get(`http://34.124.220.187`).then((res) => {
      const responseTodo = res.data;
      setTodos(responseTodo);
    });
  }, []);
  console.log(todos);

  return (
    <div className="app">
      <div className="container">
        <div>
          {todos.map((todo) => {
            const { task } = todo;
            return (
              <div key={task.id}>
                <h4>{task}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ShowTodo;
