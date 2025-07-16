import React, { useState } from "react";
import { createPlayer } from "../../services/apiService";
import "./../css/PitchForm.css";

interface PlayerFormProps {
  onSuccess: () => void;
}

export function PlayerForm({ onSuccess }: PlayerFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Nome e email são obrigatórios.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await createPlayer(name, email);
      onSuccess();
    } catch (err) {
      setError("Falha ao criar o jogador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pitch-form">
      <h2>Adicionar Novo Jogador</h2>
      <div className="form-group">
        <label htmlFor="playerName">Nome</label>
        <input
          type="text"
          id="playerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="playerEmail">Email</label>
        <input
          type="email"
          id="playerEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Adicionar Jogador"}
      </button>
    </form>
  );
}
