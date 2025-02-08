import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [cardData, setCardData] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("App loaded");
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
    setCardData({ text: taskText, data: null }); // Initialize with task text

    console.log("API Key:", import.meta.env.VITE_API_KEY);
    console.log("Endpoint ID:", import.meta.env.VITE_ENDPOINT_ID);
    console.log("Channel Token:", import.meta.env.VITE_CHANNEL_TOKEN);

    try {
      const response = await axios.post(
        `https://payload.vextapp.com/hook/${
          import.meta.env.VITE_ENDPOINT_ID
        }/catch/${import.meta.env.VITE_CHANNEL_TOKEN}`,
        { payload: taskText }, // Send task text to API
        {
          headers: {
            "Content-Type": "application/json",
            Apikey: `Api-Key ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      console.log("API Response:", response.data);

      setCardData((prevData) => ({
        ...prevData, // Keep task text as heading
        data: response.data, // Store API response
      }));

      setIsCardVisible(true);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch data from API");
      setIsCardVisible(true);
    }
  };

  const closeCard = () => {
    setIsCardVisible(false);
    setError(null);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List with assisting LLM</h2>
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
                    showCard(task.text); // FIXED: Pass task text here
                  }}
                >
                  Generate Actions llm
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
        <h2>{cardData.text}</h2> {/* Displays task name as heading */}
        {cardData.data?.text ? (
          <ul>
            {cardData.data.text.split("\n").map((line, index) =>
              line.trim() ? <li key={index}>{line.trim()}</li> : null
            )}
          </ul>
        ) : (
          <p>Loading data...</p>
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
