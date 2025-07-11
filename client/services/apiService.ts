// In client/src/services/apiService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Function to get all players
export const getPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}/player`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error; // Re-throw the error to be handled by the component
  }
};

// You will add createPlayer, updatePlayer, etc. here later
