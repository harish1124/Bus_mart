import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
// import more pages when ready

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        {/* Add more routes (e.g. for login, register, user profile, etc.) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
