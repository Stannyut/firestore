import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

// For notification and calendar feature
import { AddToCalendarButton } from "add-to-calendar-button-react";

function OccasionForm() {
  const [newOccasion, setNewOccasion] = useState({
    occasionName: "",
    occasionDate: "",
    occasionTime: "",
    description: "",
  });

  const navigate = useNavigate();
  const occasionCollectionRef = collection(db, "occasions");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOccasion((prevOccasion) => ({
      ...prevOccasion,
      [name]: value,
    }));
  };

  const addOccasion = async () => {
    try {
      await addDoc(occasionCollectionRef, newOccasion);
      alert("Occasion added successfully!");

      // Trigger browser notification
      if (Notification.permission === "granted") {
        new Notification("New Occasion Added!", {
          body: `Don't forget: ${newOccasion.occasionName} on ${newOccasion.occasionDate} at ${newOccasion.occasionTime}`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }

      navigate("/occasions");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Occasion</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="form-group mb-3">
          <label>Occasion Name</label>
          <input
            type="text"
            className="form-control"
            name="occasionName"
            value={newOccasion.occasionName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="occasionDate"
            value={newOccasion.occasionDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="occasionTime"
            value={newOccasion.occasionTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={newOccasion.description}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          onClick={addOccasion}
        >
          Add Occasion
        </button>

        {/* Add to calendar button */}
        <AddToCalendarButton
          name={newOccasion.occasionName}
          options={["Apple", "Google", "iCal", "Outlook"]}
          location="Your Location"
          startDate={newOccasion.occasionDate}
          startTime={newOccasion.occasionTime}
          description={newOccasion.description}
          timeZone="America/Los_Angeles"
          buttonStyle="3d"
          buttonText="Add to Calendar"
        />
      </form>
    </div>
  );
}

export default OccasionForm;
