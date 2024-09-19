import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EventCard from "./EventCard.jsx";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EventList() {
  const [events, setEvents] = useState([]);
  const eventCollectionRef = collection(db, "events");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(eventCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    getData();
  }, []);

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((event) => event.id !== id)); // Update UI after delete
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const editEvent = (id) => {
    navigate(`/edit-event/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Event List</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <EventCard
              eventName={event["Event Name"]}
              eventDate={event["Event Date"]}
              notes={event.Notes}
              reminder={event.Reminder}
              onDelete={() => deleteEvent(event.id)}
              onEdit={() => editEvent(event.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
