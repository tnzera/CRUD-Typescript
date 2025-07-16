import React, { useState, useEffect } from "react";
import { getPitches, deletePitch } from "../../services/apiService";
import { Modal } from "../ui/Modal";
import { PitchForm } from "./PitchForm";
import "../css/PitchList.css";

interface Pitch {
  id: number;
  name: string;
  imageUrl?: string;
}

export function PitchList() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [pitchToDelete, setPitchToDelete] = useState<Pitch | null>(null);

  const fetchPitches = async () => {
    try {
      setLoading(true);
      const data = await getPitches();
      setPitches(data);
    } catch (err) {
      setError("Não foi possível carregar as quadras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, []);

  const handlePitchCreated = () => {
    setIsCreateModalOpen(false);
    fetchPitches();
  };

  const handleDeleteClick = (pitch: Pitch) => {
    setPitchToDelete(pitch);
    setIsConfirmModalOpen(true);
  };

  // Lida com a confirmação da exclusão
  const handleConfirmDelete = async () => {
    if (!pitchToDelete) return;

    try {
      await deletePitch(pitchToDelete.id);
      setIsConfirmModalOpen(false);
      setPitchToDelete(null);
      fetchPitches();
    } catch (err) {
      alert("Falha ao deletar a quadra.");
      setIsConfirmModalOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="pitch-list-container">
        {pitches.map((pitch) => (
          <div key={pitch.id} className="pitch-card">
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(pitch)}
            >
              &times;
            </button>
            <img
              src={
                pitch.imageUrl || "https://placehold.co/600x400?text=No+Image"
              }
              alt={pitch.name}
              className="pitch-image"
            />
            <div className="pitch-info">
              <h3>{pitch.name}</h3>
            </div>
          </div>
        ))}

        <div
          className="pitch-card add-pitch-card"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <div className="add-pitch-icon">+</div>
          <p>Add Pitch</p>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <PitchForm onSuccess={handlePitchCreated} />
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <div className="confirmation-dialog">
          <h2>Confirmation</h2>
          <p>
            Are you sure you want to delete teh pitch
            <strong>"{pitchToDelete?.name}"</strong>?
          </p>
          <div className="confirmation-buttons">
            <button
              className="cancel-button"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancelar
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
