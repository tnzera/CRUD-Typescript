import React from "react";
import { ReservationList } from "../components/reservations/ReservationList";

export function ReservationsPage() {
  return (
    <div>
      <h1>Reservation Management</h1>
      <ReservationList />
    </div>
  );
}
