import React, { useState } from "react";
import { createPitch } from "../../services/apiService";
import "./../css/PitchForm.css";

interface PitchFormProps {
  onSuccess: () => void; // Função para ser chamada após o sucesso
}

export function PitchForm({ onSuccess }: PitchFormProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      setError("Nome e imagem são obrigatórios.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await createPitch(name, file);
      onSuccess(); // Chama a função de sucesso (ex: fechar o modal e recarregar a lista)
    } catch (err) {
      setError("Falha ao criar a quadra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pitch-form">
      <h2>Adicionar Nova Quadra</h2>
      <div className="form-group">
        <label htmlFor="name">Nome da Quadra</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pitchImage">Imagem da Quadra</label>
        <input
          type="file"
          id="pitchImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Adicionar Quadra"}
      </button>
    </form>
  );
}
