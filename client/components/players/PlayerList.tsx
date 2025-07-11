// In client/src/components/players/PlayerList.tsx
import React, { useState, useEffect } from "react";
import { getPlayers } from "../../services/apiService"; // Import your new service

// Define a type for your player data for type safety
interface Player {
  id: number;
  name: string;
  email: string;
}

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        // Handle error state here if you want
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // Empty array ensures this runs once

  if (loading) {
    return <p>Loading players...</p>;
  }

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} ({player.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
