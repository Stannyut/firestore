import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded

function GetData2() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    todoTask: "",
    todoDate: "",
    todoTime: "",
    petName: "",
    dailyReminder: false,
    notes: "",
  });

  const todoCollectionRef = collection(db, "todo");

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

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new todo to Firestore
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
      alert("Todo added successfully!");
      // Optionally, you can clear the form here
      setNewTodo({
        todoTask: "",
        todoDate: "",
        todoTime: "",
        petName: "",
        dailyReminder: false,
        notes: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2>Add New Todo</h2>
          <form className="mb-4">
            <div className="form-group">
              <label>Todo Task</label>
              <input
                type="text"
                className="form-control"
                name="todoTask"
                value={newTodo.todoTask}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <label>Pet Name</label>
              <input
                type="text"
                className="form-control"
                name="petName"
                value={newTodo.petName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="dailyReminder"
                checked={newTodo.dailyReminder}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Daily Reminder</label>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={newTodo.notes}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={addTodo}>
              Add Todo
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h2>Todo List</h2>
          <div className="row">
            {todos.map((todo) => (
              <div className="col-md-12 mb-3" key={todo.id}>
                <Card
                  petName={todo["Pet Name"]}
                  todoTask={todo["Todo Task"]}
                  notes={todo["Notes"]}
                  todoDate={todo["Todo Date"]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetData2;
