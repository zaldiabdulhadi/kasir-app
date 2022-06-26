import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components/index";
import { Home, Success } from "./pages/index";
import { Online, Offline } from "react-detect-offline";

export default function App() {
  return (
    <div>
      <Online>
        <div>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="success" element={<Success />} />
          </Routes>
        </div>
      </Online>
      <Offline>
        <h1 style={{ textAlign: "center" }}>Gak Punya Kuota Ya Bro</h1>
      </Offline>
    </div>
  );
}
