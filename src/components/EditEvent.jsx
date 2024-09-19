import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function EditEvent() {
  const { id } = useParams(); // Get event ID from the URL
  const [event, setEvent] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    reminder: false,
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventDocRef = doc(db, "events", id);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        setEvent(eventDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateEvent = async () => {
    const eventDocRef = doc(db, "events", id);
    try {
      await updateDoc(eventDocRef, {
        "Event Name": event.eventName,
        "Event Date": event.eventDate,
        "Event Time": event.eventTime,
        Reminder: event.reminder,
        Notes: event.notes,
      });
      alert("Event updated successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Event</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="form-group mb-3">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            name="eventName"
            value={event.eventName}
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
            value={event.eventDate}
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
            value={event.eventTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="reminder"
            checked={event.reminder}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Set Reminder</label>
        </div>
        <div className="form-group mb-3">
          <label>Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={event.notes}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={updateEvent}
        >
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
