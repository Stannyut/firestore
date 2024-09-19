// TodoForm.jsx
import React, { useState } from "react";
import { db } from "./firebase-config";
import { collection } from "firebase/firestore";

const TodoForm = () => {
  const [todoTask, setTodoTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [petName, setPetName] = useState("");
  const [notes, setNotes] = useState("");
  const [createdTodo, setCreatedTodo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todoTask,
        date,
        time,
        petName,
        notes,
      });

      setCreatedTodo({
        todoTask,
        date,
        time,
        petName,
      });

      setTodoTask("");
      setDate("");
      setTime("");
      setPetName("");
      setNotes("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Create a New Todo</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div>
          <label>Todo Task:</label>
          <input
            type="text"
            value={todoTask}
            onChange={(e) => setTodoTask(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Todo</button>
      </form>

      {createdTodo && (
        <div
          style={{
            border: "1px solid #ccc",
            marginTop: "20px",
            padding: "10px",
            display: "inline-block",
          }}
        >
          <h3>{createdTodo.todoTask}</h3>
          <p>Date: {createdTodo.date}</p>
          <p>Time: {createdTodo.time}</p>
          <p>Pet Name: {createdTodo.petName}</p>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
