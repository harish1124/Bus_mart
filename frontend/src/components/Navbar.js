import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: 12, background: "#004c6d", color: "#fff" }}>
    <Link to="/" style={{ color: "#fff", textDecoration: "none", marginRight: 16 }}>Home</Link>
    {/* Add more nav links for login/register/profile */}
  </nav>
);

export default Navbar;
