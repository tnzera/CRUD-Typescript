import React, { useState, useEffect } from "react";
import { getPitches } from "../../services/apiService";
import { Modal } from "../ui/Modal"; // Importe o Modal
import { PitchForm } from "./PitchForm"; // Importe o Form
import "../css/PitchList.css"; // Importando o CSS

// Definindo o tipo de dados para uma quadra
interface Pitch {
  id: number;
  name: string;
  imageUrl?: string;
}

export function PitchList() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- ESTADO PARA CONTROLAR O MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false); // Fecha o modal
    fetchPitches(); // Recarrega a lista de quadras
  };

  if (loading) return <p>Carregando quadras...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="pitch-list-container">
        {/* ... (map das pitches existentes) */}
        {pitches.map((pitch) => (
          <div key={pitch.id} className="pitch-card">
            <img
              src={
                pitch.imageUrl || "https://placehold.co/600x400?text=Sem+Imagem"
              }
              alt={pitch.name}
              className="pitch-image"
            />
            <div className="pitch-info">
              <h3>{pitch.name}</h3>
            </div>
          </div>
        ))}

        {/* --- CARD DE ADICIONAR --- */}
        <div
          className="pitch-card add-pitch-card"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="add-pitch-icon">+</div>
          <p>Adicionar Quadra</p>
        </div>
      </div>

      {/* --- RENDERIZAÇÃO DO MODAL --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PitchForm onSuccess={handlePitchCreated} />
      </Modal>
    </>
  );
}
