import React, { useState, useEffect } from "react";
import { getReservations } from "../../services/apiService";
import "./../css/ReservationList.css";

// Reutilize as interfaces definidas no apiService ou defina-as aqui
interface Player {
  id: number;
  name: string;
}

interface Pitch {
  id: number;
  name: string;
}

interface Reservation {
  id: number;
  reservationTime: string;
  durationMinutes: number;
  player: Player[];
  pitch: Pitch;
}

export function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
      } catch (err) {
        setError("Cant load reserves.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reservation-list-container">
      {reservations.length > 0 ? (
        reservations.map((res) => (
          <div key={res.id} className="reservation-card">
            <div className="reservation-header">
              <h3>Pitch: {res.pitch.name}</h3>
            </div>
            <div className="reservation-body">
              <p>
                <strong>Data:</strong>{" "}
                {new Date(res.reservationTime).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(res.reservationTime).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Duration:</strong> {res.durationMinutes} minutos
              </p>
              <div className="reservation-players">
                <strong>Players:</strong>
                <ul>
                  {res.player.map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No reservation found.</p>
      )}
    </div>
  );
}
