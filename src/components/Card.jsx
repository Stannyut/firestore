import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = ({
  petName,
  treatmentTask,
  notes,
  todoDate,
  onDelete,
  onEdit,
}) => {
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString()
    : "No date";

  return (
    <div className="card shadow-sm" style={{ cursor: "pointer" }}>
      <div className="card-body" onClick={onEdit}>
        <h5 className="card-title">{petName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{treatmentTask}</h6>
        <p className="card-text">{notes}</p>
        <p className="card-text">
          <small className="text-muted">{formattedDate}</small>
        </p>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
