import { useEffect, useState } from "react";

import "./App.css";
import { Todo } from "./componentes/Todo";

function App() {
  //TODO individual
  const [todo, setTodo] = useState({
    id: Math.random().toString(36).substr(2, 18),
    title: "",
    completed: false,
  });

  //* Arreglo de TODOs
  const obtenerTodos = localStorage.getItem('todosLocalStorage')
  const [todos, setTodos] = useState( JSON.parse(obtenerTodos) || []);
  
  localStorage.setItem('todosLocalStorage', JSON.stringify(todos));

  const handleChange = ({ target }) => {
    setTodo({ ...todo, title: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(todo.title === '') return alert('Completa el campo');
    setTodo({ title: "" });
    setTodos([...todos, todo]);
  };

  const handleUpdate=(id, value)=>{
    const temp = [...todos];
    const item = temp.find( item => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  const handleDelete = (id)=>{
    const temp = todos.filter( item => item.id !== id);
    setTodos(temp);
  }

  return (
    <div className="container">
      <h1 className="pendientes">TODOS pendientes: { todos.length}</h1>
      <form className="crear" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Hacer tarea..."
          value={todo.title}
          onChange={handleChange}
        />
        <button className="btn" onClick={onSubmit}>
          Add
        </button>
      </form>

      <div className="todo-container">
        {
        todos.map((todo) => (
          <Todo todo={todo} onUpdate={handleUpdate} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}

export default App;
