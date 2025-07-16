import React, { useState, useEffect } from "react";
import { getPlayers } from "../../services/apiService";
import "../css/PlayerList.css";
import { PlayerForm } from "./PlayerForm";
import { Modal } from "../ui/Modal";

interface Player {
  id: number;
  name: string;
  email: string;
}

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlayers = async () => {
    setIsLoading(true);
    const data = await getPlayers();
    setPlayers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handlePlayerCreated = () => {
    setIsModalOpen(false);
    fetchPlayers();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul className="player-list">
        {players.map((player) => (
          <li key={player.id} className="player-item">
            <span className="player-name">{player.name}</span>
            <span className="player-email">{player.email}</span>
          </li>
        ))}
      </ul>

      <div className="add-player-link-container">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          + Add Player
        </a>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PlayerForm onSuccess={handlePlayerCreated} />
      </Modal>
    </>
  );
}
