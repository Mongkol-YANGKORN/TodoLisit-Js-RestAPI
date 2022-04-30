import "./App.css";
import FormTodo from "./FormTodo";
import ShowTodo from "./ShowTodo";
import Todo from "./store";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List with restAPI</h1>
        <FormTodo />
        {/* <ShowTodo /> */}
      </div>
    </div>
  );
}

export default App;
