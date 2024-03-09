"use client";

import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useAdministrations } from "@/context/AdministrationContext";
import AdministrationForm from "@/components/AdministrationForm";
import AdministrationCard from "@/components/AdministrationCard";

function AdmPage() {
  const { administrations, loadPatients, msg} = useAdministrations();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPatients();
    }, 1000);
    return () => clearTimeout(timer);
  }, [msg]);


  function renderlista() {
    if (administrations.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No hay Pacientes</h1>
          </div>
        </div>
      );
    } else {
      return <AdministrationCard administrations={administrations} />;
    }
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="listaPatients"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="listaPatients" title="Lista de Pacientes">
          <div
            className="tab-pane fade active show"
            id="listaPatients"
            role="tabpanel"
          >
            {renderlista()}
          </div>
        </Tab>
        <Tab eventKey="crearPatients" title="Crear Pacientes">
          <AdministrationForm />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdmPage;
