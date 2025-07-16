import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Layout } from "../components/Layout";
import { ReservationsPage } from "../pages/ReservationsPage.tsx";
import { PlayersPage } from "../pages/PlayersPage";
import { PitchesPage } from "../pages/PitchesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ReservationsPage />,
      },
      {
        path: "players",
        element: <PlayersPage />,
      },
      {
        path: "pitches",
        element: <PitchesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
