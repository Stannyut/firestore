import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function EditTodo() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const docRef = doc(db, "todo", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTodo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "todo", id);
      await updateDoc(docRef, todo);
      alert("Todo updated successfully!");
      navigate("/todos");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Todo</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="form-group mb-3">
          <label>Todo Task</label>
          <input
            type="text"
            className="form-control"
            name="Todo Task"
            value={todo["Todo Task"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="Todo Date"
            value={todo["Todo Date"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="Todo Time"
            value={todo["Todo Time"]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Pet Name</label>
          <input
            type="text"
            className="form-control"
            name="Pet Name"
            value={todo["Pet Name"]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Notes</label>
          <textarea
            className="form-control"
            name="Notes"
            value={todo["Notes"]}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleUpdate}
        >
          Update Todo
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
