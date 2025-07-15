import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
  return (
    <div>
      <nav>
        <Header />
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
      <Footer />
    </div>
  );
}
