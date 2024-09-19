import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded

function GetData() {
  const [todos, setTodos] = useState([]);
  const todoCollectionRef = collection(db, "todo");

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(todoCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-4" key={todo.id}>
            <Card
              petName={todo["Pet Name"]}
              todoTask={todo["Todo Task"]}
              notes={todo["Notes"]}
              todoDate={todo["Todo Date"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetData;
