import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function EventForm() {
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    reminder: false,
    notes: "",
  });

  const eventCollectionRef = collection(db, "events");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addEvent = async () => {
    try {
      await addDoc(eventCollectionRef, {
        "Event Name": newEvent.eventName,
        "Event Date": newEvent.eventDate,
        "Event Time": newEvent.eventTime,
        Reminder: newEvent.reminder,
        Notes: newEvent.notes,
      });
      alert("Event added successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Event</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="form-group mb-3">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            name="eventName"
            value={newEvent.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="eventDate"
            value={newEvent.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="eventTime"
            value={newEvent.eventTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="reminder"
            checked={newEvent.reminder}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Set Reminder</label>
        </div>
        <div className="form-group mb-3">
          <label>Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={newEvent.notes}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={addEvent}
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
