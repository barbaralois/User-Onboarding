import React from 'react';

export default function User({ details }) {
  if (!details) {
    return <h3>Working on fetching the user details...</h3>;
  }

  return (
    <div className="container">
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
    </div>
  );
}
