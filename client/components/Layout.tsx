import React from "react";
import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
          <li style={{ marginRight: "1rem" }}>
            {/* Use the Link component for navigation */}
            <Link to="/">Reservations</Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/pitches">Pitches</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <main>
        {/* Child routes will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
}
