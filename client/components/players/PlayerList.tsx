import React, { useState, useEffect } from "react";
import { getPlayers, deletePlayer } from "../../services/apiService";
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);

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
    setIsCreateModalOpen(false);
    fetchPlayers();
  };

  const handleDeleteClick = (player: Player) => {
    setPlayerToDelete(player);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!playerToDelete) return;
    try {
      await deletePlayer(playerToDelete.id);
      setIsConfirmModalOpen(false);
      setPlayerToDelete(null);
      fetchPlayers();
    } catch (err) {
      alert("Falha ao deletar o jogador. Verifique se ele não tem reservas.");
      setIsConfirmModalOpen(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul className="player-list">
        {players.map((player) => (
          <li key={player.id} className="player-item">
            <span className="player-name">{player.name}</span>
            <span className="player-email">{player.email}</span>
            <button
              className="list-delete-button"
              onClick={() => handleDeleteClick(player)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <div className="add-player-link-container">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsCreateModalOpen(true);
          }}
        >
          + Add Player
        </a>
      </div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <PlayerForm onSuccess={handlePlayerCreated} />
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <div className="confirmation-dialog">
          <h2>Confirmation</h2>
          <p>
            Are you sure you want to delete player
            <strong> "{playerToDelete?.name}"</strong>?
          </p>
          <div className="confirmation-buttons">
            <button
              className="cancel-button"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="confirm-delete-button"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
