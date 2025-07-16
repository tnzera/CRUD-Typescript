import React, { useState } from "react";
import { ReservationList } from "../components/reservations/ReservationList";
import { Modal } from "../components/ui/Modal";
import { ReservationForm } from "../components/reservations/ReservationForm";

export function ReservationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para forçar a atualização da lista
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReservationCreated = () => {
    setIsModalOpen(false);
    // Altera a chave para forçar o componente ReservationList a recarregar
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Reservations Management</h1>
        <button
          className="form-submit-button"
          onClick={() => setIsModalOpen(true)}
        >
          + New Reservation
        </button>
      </div>

      {/* Passa a chave para o componente da lista */}
      <ReservationList key={refreshKey} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReservationForm onSuccess={handleReservationCreated} />
      </Modal>
    </div>
  );
}
