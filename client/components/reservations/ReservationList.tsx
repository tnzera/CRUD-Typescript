import React, { useState, useEffect } from "react";
import { getReservations, deleteReservation } from "../../services/apiService";
import { Modal } from "../ui/Modal";
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

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] =
    useState<Reservation | null>(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      setError("Não foi possível carregar as reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDeleteClick = (reservation: Reservation) => {
    setReservationToDelete(reservation);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reservationToDelete) return;
    try {
      await deleteReservation(reservationToDelete.id);
      setIsConfirmModalOpen(false);
      setReservationToDelete(null);
      fetchReservations(); // Recarrega a lista
    } catch (err) {
      alert("Fail to delete reservation.");
      setIsConfirmModalOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="reservation-list-container">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <div key={res.id} className="reservation-card">
              <button
                className="reservation-delete-button"
                onClick={() => handleDeleteClick(res)}
              >
                &times;
              </button>
              <div className="reservation-header">
                <h3>Quadra: {res.pitch.name}</h3>
              </div>
              <div className="reservation-body">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(res.reservationTime).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(res.reservationTime).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>Time:</strong> {res.durationMinutes} minutes
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

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <div className="confirmation-dialog">
          <h2>Confirmation</h2>
          <p>
            Are you sure you want to delete this reservation
            <strong> "{reservationToDelete?.pitch.name}"</strong>?
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
