import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./App.css";
import vext from "@api/vext"; // Import the vext library

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [cardData, setCardData] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [error, setError] = useState(null);

  // Authenticate with the API key
  useEffect(() => {
    vext.auth(`Api-Key ${process.env.REACT_APP_VITE_API_KEY}`);
  }, []);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showCard = async (taskText) => {
    setError(null);
    setCardData({ text: taskText }); // Set initial heading to task text
  
    console.log("API Key:", import.meta.env.VITE_API_KEY);
    console.log("Endpoint ID:", import.meta.env.VITE_ENDPOINT_ID);
    console.log("Channel Token:", import.meta.env.VITE_CHANNEL_TOKEN);
  
    try {
      const response = await axios.post(
        `https://payload.vextapp.com/hook/${import.meta.env.VITE_ENDPOINT_ID}/catch/${import.meta.env.VITE_CHANNEL_TOKEN}`,
        { payload: taskText }, // Send task text to API
        {
          headers: {
            "Content-Type": "application/json",
            "Apikey": `Api-Key ${import.meta.env.VITE_API_KEY}`
          }
        }
      );
  
      console.log("API Response:", response.data);
  
      // Ensure we keep the task name as the heading while merging API data
      setCardData((prevData) => ({
        ...response.data,
        text: prevData.text // Keep the task text as the title
      }));
      
  

  const closeCard = () => {
    setIsCardVisible(false);
    setError(null);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add your task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "checked" : ""}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
              <div className="button-group">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="delete-icon"
                >
                  &#x2715;
                </span>
                <button
                  className="change-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showCard(task.text); // Pass task text when clicking Generate
                  }}
                >
                  Generate
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isCardVisible && (
        <div className="data-card">
          {error ? (
            <p>Error: {error}</p>
          ) : cardData ? (
            <>
              <h2>{cardData.text || "No text available"}</h2>{" "}
              {/* Task name as heading */}
              {cardData.citation && cardData.citation.sources && (
                <div className="citation">
                  <h3>Citation:</h3>
                  {cardData.citation.sources.map((source, index) => (
                    <div key={index} className="source">
                      <p>Source Name: {source.source_name}</p>
                      <p>Source URL: {source.source_url}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p>Loading data...</p>
          )}
          <button onClick={closeCard}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
