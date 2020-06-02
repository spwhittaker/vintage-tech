import React from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Buy vintage tech</h1>
        <p>They don't build them like they used to.</p>
        {children}
      </div>
    </div>
  );
}
