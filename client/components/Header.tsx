import React from "react";
import "./css/Header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header-container">
      {/* Adicione uma div interna com a classe do layout */}
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">FootballApp</Link>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/">Reservations</Link>
            </li>
            <li>
              <Link to="/players">Players</Link>
            </li>
            <li>
              <Link to="/pitches">Pitches</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
