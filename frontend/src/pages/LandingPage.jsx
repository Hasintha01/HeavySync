import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to HeavySync</h1>
      <p>Your solution for supplier and purchase order management.</p>
      <Link to="/dashboard" className="btn">Go to Dashboard</Link>
    </div>
  );
};

export default LandingPage;
