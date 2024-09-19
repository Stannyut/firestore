import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const todoCollectionRef = collection(db, "todo");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(todoCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(data);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    getData();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todo", id));
      setTodos(todos.filter((todo) => todo.id !== id)); // Update UI after delete
      alert("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const editTodo = (id) => {
    navigate(`/edit/${id}`); // Navigate to edit form
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo List</h2>
      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-4 mb-4" key={todo.id}>
            <Card
              petName={todo["Pet Name"]}
              todoTask={todo["Todo Task"]}
              notes={todo["Notes"]}
              todoDate={todo["Todo Date"]}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => editTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
