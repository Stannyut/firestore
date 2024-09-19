import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded

const Card = ({ petName, todoTask, notes, todoDate }) => {
  // Format the timestamp into a readable string
  const formattedDate = todoDate
    ? new Date(todoDate.seconds * 1000).toLocaleString()
    : "No date";

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{petName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{todoTask}</h6>
        <p className="card-text">{notes}</p>
        <p className="card-text">
          <small className="text-muted">{formattedDate}</small>
        </p>
      </div>
    </div>
  );
};

export default Card