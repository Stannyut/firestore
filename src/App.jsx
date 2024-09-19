import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import EditTodo from "./components/EditTodo";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import EditEvent from "./components/EditEvent";
import OccasionList from "./components/OccasionList"; // New component for viewing occasions
import OccasionForm from "./components/OccasionForm"; // New component for adding occasions

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Todo Routes */}
          <Route path="/" element={<TodoList />} /> {/* Home shows Todo List */}
          <Route path="/add" element={<TodoForm />} /> {/* Add new Todo */}
          <Route path="/edit/:id" element={<EditTodo />} /> {/* Edit Todo */}
          {/* Event Routes */}
          <Route path="/events" element={<EventList />} /> {/* Event list */}
          <Route path="/add-event" element={<EventForm />} />{" "}
          {/* Add new Event */}
          
          <Route path="/edit-event/:id" element={<EditEvent />} />{" "}
          {/* Edit Event */}
          {/* Occasion Routes */}
          <Route path="/occasions" element={<OccasionList />} />{" "}
          Occasion list
          <Route path="/add-occasion" element={<OccasionForm />} />{" "}
          {/* Add Occasion */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
