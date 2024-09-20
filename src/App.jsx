import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import EditTodo from "./components/EditTodo";



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TodoForm />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
