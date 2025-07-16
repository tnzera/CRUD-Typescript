import React, { useState, useEffect } from "react";
import {
  getPitches,
  getPlayers,
  createReservation,
} from "../../services/apiService";
import "./../css/PitchForm.css";

// Interfaces para os dados que vamos buscar
interface Pitch {
  id: number;
  name: string;
}
interface Player {
  id: number;
  name: string;
}

interface ReservationFormProps {
  onSuccess: () => void;
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  // Estados para os dados dos formulários
  const [selectedPitch, setSelectedPitch] = useState<string>("");
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [reservationTime, setReservationTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("60");

  // Estados para carregar os dados das listas
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efeito para buscar as listas de quadras e jogadores quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pitchesData = await getPitches();
        const playersData = await getPlayers();
        setPitches(pitchesData);
        setPlayers(playersData);
      } catch (err) {
        setError("Não foi possível carregar os dados para o formulário.");
      }
    };
    fetchData();
  }, []);

  const handlePlayerChange = (playerId: number) => {
    setSelectedPlayers(
      (prev) =>
        prev.includes(playerId)
          ? prev.filter((id) => id !== playerId) // Desmarca se já estiver selecionado
          : [...prev, playerId] // Marca se não estiver selecionado
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPitch || selectedPlayers.length === 0 || !reservationTime) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const payload = {
      pitch: { id: parseInt(selectedPitch) },
      player: selectedPlayers.map((id) => ({ id })),
      reservationTime: new Date(reservationTime).toISOString(),
      durationMinutes: parseInt(duration),
    };

    try {
      await createReservation(payload);
      onSuccess();
    } catch (err) {
      setError("Falha ao criar a reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pitch-form">
      <h2>Nova Reserva</h2>

      <div className="form-group">
        <label htmlFor="pitch">Selecione a Quadra</label>
        <select
          id="pitch"
          value={selectedPitch}
          onChange={(e) => setSelectedPitch(e.target.value)}
        >
          <option value="" disabled>
            Escolha uma quadra...
          </option>
          {pitches.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Selecione os Jogadores</label>
        <div className="checkbox-group">
          {players.map((p) => (
            <label key={p.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedPlayers.includes(p.id)}
                onChange={() => handlePlayerChange(p.id)}
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reservationTime">Data e Hora</label>
        <input
          type="datetime-local"
          id="reservationTime"
          value={reservationTime}
          onChange={(e) => setReservationTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duração (minutos)</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Agendando..." : "Agendar Reserva"}
      </button>
    </form>
  );
}
