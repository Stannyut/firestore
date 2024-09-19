import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EventCard = ({ eventName, eventDate, notes, reminder, onDelete, onEdit }) => {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString()
    : "No date";

  return (
    <div className="card shadow-sm" style={{ cursor: "pointer" }}>
      <div className="card-body" onClick={onEdit}>
        <h5 className="card-title">{eventName}</h5>
        <p className="card-text">{notes}</p>
        <p className="card-text">
          <small className="text-muted">{formattedDate}</small>
        </p>
        {reminder && <p className="text-warning">Reminder Set</p>}
      </div>
      <div className="card-footer">
        <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
