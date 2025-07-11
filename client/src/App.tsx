import React, { useState, useEffect } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("http://localhost:3000/api/player");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }

    fetchPlayers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Players</h1>
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.name} - {player.email}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
