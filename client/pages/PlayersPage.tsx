// In client/src/pages/PlayersPage.tsx
import React from "react";
import { PlayerList } from "../components/players/PlayerList";

export function PlayersPage() {
  return (
    <div>
      <h1>Player Management</h1>
      <PlayerList />
      {/* You will add the PlayerForm here later */}
    </div>
  );
}
