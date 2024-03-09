"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IconHomeCog, IconUserCircle, IconLogout } from "@tabler/icons-react";

export default function Navigation() {
  const options = [
    {
      name: "end",
      scroll: true,
      backdrop: true,
    },
  ];

  function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
      <>
        <Button variant="primary" onClick={toggleShow} className="me-2">
          <IconHomeCog color="white" size={24} />
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <IconUserCircle color="blue" size={24} />
            <Offcanvas.Title> Perfil</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>User name</p>
            <div className="d-flex align-items-end flex-column">
              <div className="mt-auto p2">
                <p>
                  Salir
                  <IconLogout
                    className="justify-content-end pl-4"
                    color="blue"
                    size={24}
                  />
                </p>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  function Example() {
    return (
      <>
        {["end"].map((placement, idx) => (
          <OffCanvasExample key={idx} placement={placement} name={placement} />
        ))}
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          CONSULTORIO MÉDICO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Inicio <span className="visually-hidden">(current)</span>
              </Link>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link" href="/administration">
                Pacientes
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Example />
          </form>
        </div>
      </div>
    </nav>
  );
}
