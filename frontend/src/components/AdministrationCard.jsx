import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useAdministrations } from "@/context/AdministrationContext";

function AdministrationCard({ administrations }) {
  const { delPatient, setAdministrations } = useAdministrations();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  useEffect(() => {
    //pasando los 10 segundos se deshabilita el boton eliminar
    const timer = setTimeout(() => {
      setAccion(false);
    }, 10000);
    if (select.length === 0) {
      setAccion(false);
    }

    return () => clearTimeout(timer);
  }, [select]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    //console.log(value )
    if (checked) {
      setSelect([...select, value]);
      //console.log(value);
      setAccion(checked);
    } else {
      //pasa todos los datos menos los selecionados
      setSelect(select.filter((o) => o !== value));
    }
  };

  function Orden(columna) {
    const datosOrdenados = [...administrations];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setAdministrations(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  const handleDelete = () => {
    delPatient(select);
    toast.success("El paciente se ha eliminado correctamente", {
      duration: 4000
    });
    
    window.location.reload();
    handleClose();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Lista de Pacientes</h2>
        <button
          onClick={handleShow}
          disabled={!accion}
          type="button"
          className="btn btn-danger m-1"
        >
          Eliminar
        </button>
        <button
          type="button"
          className="btn btn-warning m-1 px-4"
          disabled={!accion}
          onClick={() => router.push(`/administration/edit/${select}`)}
        >
          Editar
        </button>
        <table className="table table-hover mt-2">
          <thead>
            <tr>
              <th scope="col">Accion</th>
              <th scope="col">ID</th>
              <th scope="col" onClick={() => Orden("id")}>
                Nombre Completo
              </th>
              <th scope="col">Direccion</th>
              <th scope="col">Celular</th>
              <th scope="col">Número Historial Médico</th>
              <th scope="col">Fecha de Creacion</th>
            </tr>
          </thead>

          <tbody>
            {administrations.map((patient) => (
              <tr scope="row" key={patient.id}>
                <td>
                  <input
                    onChange={handleChange}
                    className="form-check-input"
                    type="checkbox"
                    value={patient.id}
                    id="flexCheckDefault"
                  />
                </td>

                <td>{patient.id}</td>
                <td>{patient.nombre}</td>
                <td>{patient.direccion}</td>
                <td>{patient.celular}</td>
                <td>{patient.hmedico}</td>
                <td>{patient.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Realmente deseas eliminar el dato de paciente? 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              type="button"
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdministrationCard;
