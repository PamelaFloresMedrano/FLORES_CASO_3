"use client"
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Home() {
  const handleTabSelect = (eventKey) => {
    console.log('Pestaña seleccionada:', eventKey);
    // Realizar acciones o mostrar contenido sobre el consultorio
  };

  return (
    
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Bienvenido a Citas Médicas</h1>
        <p className="card-text">
          En esta aplicación podrás gestionar las citas médicas de tus pacientes.
        </p>
    </div>
    </div>
  );
}

export default Home;
