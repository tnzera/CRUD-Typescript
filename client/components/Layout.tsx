import React from "react";
import "./css/Layout.css";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
  return (
    <div className="layout-container">
      <Header />
      {}
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
