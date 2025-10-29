import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import external CSS

function App() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const endpoints = {
    "Movies vs TV Shows": "http://netflix-backend-21xz.onrender.com/plot/type",
    "Top 10 Countries": "http://netflix-backend-21xz.onrender.com/plot/countries",
    "Release Trend": "http://netflix-backend-21xz.onrender.com/plot/release_trend",
    "Top Genres": "http://netflix-backend-21xz.onrender.com/plot/genres",
    "Ratings Distribution": "http://netflix-backend-21xz.onrender.com/plot/ratings",
    "Average Duration": "http://netflix-backend-21xz.onrender.com/plot/duration",
    "Top Directors": "http://netflix-backend-21xz.onrender.com/plot/directors",
  };

  const handleSelect = async (option) => {
    setSelectedOption(option);
    setLoading(true);
    setImage("");

    try {
      const res = await axios.get(endpoints[option]);
      setImage(`data:image/png;base64,${res.data.image}`);
    } catch (err) {
      console.error("Error fetching graph:", err);
      alert("Error loading graph!");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">🎬 Netflix Data Analyzer</h1>
      <p className="subtitle">Visualize trends and patterns from Netflix shows and movies</p>

      <div className="dropdown-container">
        <select
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue=""
          className="dropdown"
        >
          <option value="" disabled>
            Select Analysis Type
          </option>
          {Object.keys(endpoints).map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading">📊 Generating chart...</p>}

      {image && (
        <div className="chart-container">
          <h2 className="chart-title">{selectedOption}</h2>
          <img src={image} alt="Netflix Chart" className="chart-image" />
        </div>
      )}

      <footer className="footer">
        Made with ❤️ using Flask + React + Python
      </footer>
    </div>
  );
}

export default App;
