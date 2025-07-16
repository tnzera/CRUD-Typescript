import axios from "axios";

const API_URL = "http://localhost:3000/api";
const BASE_URL = "http://localhost:3000";

// Define Interfaces
interface Player {
  id: number;
  name: string;
  email: string;
}
interface Pitch {
  id: number;
  name: string;
  imageUrl?: string;
}
interface Reservation {
  id: number;
  reservationTime: string;
  durationMinutes: number;
  player: Player[];
  pitch: Pitch;
}
interface ReservationPayload {
  reservationTime: string;
  durationMinutes: number;
  player: { id: number }[];
  pitch: { id: number };
}

// API Player Functions
export const getPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}/player`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const createPlayer = async (name: string, email: string) => {
  try {
    const response = await axios.post(`${API_URL}/player`, { name, email });
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

export const deletePlayer = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/player/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar o jogador:", error);
    throw error;
  }
};

// API Pitch Functions
export const getPitches = async () => {
  try {
    const response = await axios.get(`${API_URL}/Pitch`);
    return response.data.map((pitch: Pitch) => ({
      ...pitch,
      imageUrl: pitch.imageUrl
        ? `${BASE_URL}/${pitch.imageUrl.replace(/\\/g, "/")}`
        : null,
    }));
  } catch (error) {
    console.error("Error fetching pitches:", error);
    throw error;
  }
};

export const createPitch = async (name: string, imageFile: File | null) => {
  const formData = new FormData();

  formData.append("name", name);
  if (imageFile) {
    formData.append("pitchImage", imageFile);
  }

  try {
    const response = await axios.post(`${API_URL}/Pitch`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating pitch:", error);
    throw error;
  }
};

export const deletePitch = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/Pitch/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting pitch:", error);
    throw error;
  }
};

// API Reservation Functions
export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservation`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export const createReservation = async (payload: ReservationPayload) => {
  try {
    const response = await axios.post(`${API_URL}/reservation`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const deleteReservation = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/reservation/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar a reserva:", error);
    throw error;
  }
};
