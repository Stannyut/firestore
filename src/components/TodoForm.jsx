import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoForm() {
  const [newTodo, setNewTodo] = useState({
    todoTask: "",
    todoDate: "",
    todoTime: "",
    petName: "",
    dailyReminder: false,
    notes: "",
  });

  const todoCollectionRef = collection(db, "todo");
  const navigate = useNavigate(); 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new todo to Firestore and navigate to TodoList page
  const addTodo = async () => {
    try {
      await addDoc(todoCollectionRef, {
        "Todo Task": newTodo.todoTask,
        "Todo Date": newTodo.todoDate,
        "Todo Time": newTodo.todoTime,
        "Pet Name": newTodo.petName,
        "Daily Reminder": newTodo.dailyReminder,
        Notes: newTodo.notes,
      });
      // alert("Todo added successfully!");

      // Navigate to the TodoList page after adding the todo
      navigate("/todos");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Treatment</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="form-group mb-3">
          <label>Treatment Task</label>
          <input
            type="text"
            className="form-control"
            name="todoTask"
            value={newTodo.todoTask}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="todoDate"
            value={newTodo.todoDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="todoTime"
            value={newTodo.todoTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Pet Name</label>
          <input
            type="text"
            className="form-control"
            name="petName"
            value={newTodo.petName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="dailyReminder"
            checked={newTodo.dailyReminder}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Daily Reminder</label>
        </div>
        <div className="form-group mb-3">
          <label>Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={newTodo.notes}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
