import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as api from "./store";

function FormTodo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const inputAreaRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.readTodo();
      console.log(result);
      setTodos(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("outside");
        setEdit(false);
        setTodo({ task: "" });
      } else {
        console.log("inside");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const createTodo = async () => {
    try {
      const { data } = await api.createTodo(todo);
      setTodos([...todos, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    await api.deleteTodo(id);
    const result = await api.readTodo();
    setTodos(result.data);
  };

  const editTodo = (id, task) => {
    setTodo({ id, task });
    setEdit(true);
  };

  const updateTodo = async () => {
    let id = todo.id;
    delete todo.id;
    await api.updateTodo(id, todo);
    const result = await api.readTodo();
    setTodos(result.data);
    console.log("id = ", id);
  };

  console.log(todo);
  console.log(todos);

  return (
    <div>
      <Form ref={inputAreaRef}>
        <Form.Group>
          <Form.Label>
            <b>Add Todo</b>
          </Form.Label>
          <Form.Control
            type="text"
            className="input"
            value={todo.task}
            onChange={(e) => setTodo({ ...todo, task: e.target.value })}
            placeholder="Add new todo"
          />
        </Form.Group>
        {edit ? (
          <Button variant="primary mb-3" type="submit" onClick={updateTodo}>
            Update
          </Button>
        ) : (
          <Button variant="primary mb-3" type="submit" onClick={createTodo}>
            Submit
          </Button>
        )}
      </Form>
      <pre>{JSON.stringify(todo, null, "\t")}</pre>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <a href="#" onClick={() => editTodo(todo.id, todo.task)}>
                <h4>{todo.task}</h4>
              </a>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FormTodo;
