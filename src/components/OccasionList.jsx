import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function OccasionList() {
  const [occasions, setOccasions] = useState([]);
  const navigate = useNavigate();
  const occasionCollectionRef = collection(db, "occasions");

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const querySnapshot = await getDocs(occasionCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOccasions(data);
      } catch (error) {
        console.error("Error fetching occasions: ", error);
      }
    };

    fetchOccasions();
  }, []);

  // Handle delete occasion
  const deleteOccasion = async (id) => {
    const occasionDocRef = doc(db, "occasions", id);
    try {
      await deleteDoc(occasionDocRef);
      setOccasions((prevOccasions) =>
        prevOccasions.filter((occasion) => occasion.id !== id)
      );
      alert("Occasion deleted successfully!");
    } catch (error) {
      console.error("Error deleting occasion: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Important Occasions</h2>
      <div className="row">
        {occasions.map((occasion) => (
          <div className="col-md-4 mb-4" key={occasion.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{occasion.occasionName}</h5>
                <p className="card-text">
                  Date: {occasion.occasionDate} <br />
                  Time: {occasion.occasionTime}
                </p>
                <p className="card-text">{occasion.description}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/edit-occasion/${occasion.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteOccasion(occasion.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OccasionList;
