import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div>
      <h2>HERE IS OUT TERMS AND CONDITIONS</h2>
      <p>
        Go back to registration:<Link to="/register">Register</Link>{" "}
      </p>
    </div>
  );
};

export default TermsAndConditions;
