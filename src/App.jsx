import React, { useState } from 'react'

import Heading from "./components/Heading";
import ToDoList from "./components/ToDoList";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [newTask, setNewTask] = useState("");

  return (
    <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
      <Heading />
      <ToDoList 
      showModal={showModal} 
      setShowModal={setShowModal} 
      currentToDo={currentToDo} 
      setCurrentToDo={setCurrentToDo} 
      newTask={newTask} 
      setNewTask={setNewTask}/>
    </div>
  );
}

export default App;
