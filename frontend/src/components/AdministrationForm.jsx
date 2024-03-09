"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { useRouter, useParams } from "next/navigation";
import { useAdministrations } from "@/context/AdministrationContext";
import { IconArrowLeft } from "@tabler/icons-react";


function AdministrationForm() {
  const { administrations, crPatient, upPatient, gtPatient, msg } = useAdministrations();
  const params = useParams();
  const router = useRouter();
  const [administration, setAdministration] = useState({
    id: "",
    nombre: "",
    direccion: "",
    celular: "",
    hmedico: ""
  });
  useEffect(() => {
    const loadAdministration = async () => {
      if (params && params.id) {
        const administration = await gtPatient(params.id);
        setAdministration({
          nombre: administration.nombre,
          direccion: administration.direccion,
          celular: administration.celular,
          hmedico: administration.hmedico
        });
      }
    };
    loadAdministration();
  }, []);

  const clearInput = () => {
    setAdministration([]);

  };

  return (
    <div className="card">
      <Formik
        initialValues={administration}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.nombre) {
            errores.nombre = "Por favor ingrese el nombre completo del paciente";
          } else if (values.nombre.length < 3) { 
            errores.nombre = "El nombre debe tener al menos 3 caracteres";
          if (!values.direccion) {
            errores.direccion = "Por favor ingresa la direccion del paciente";
          }  
          if (!values.celular) {
            errores.celular = "Por favor ingrese el celular del paciente";
          }
          if (!values.hmedico) {
            errores.hmedico = "Por favor ingrese el historial médico del paciente";
          } else {
            administrations.map((hmedico) => (
              <span key={hmedico.id}>
                {hmedico.hmedico === values.hmedico
                  ? (errores.hmedico =
                      "El historial médico ya está registrada en el sistema")
                  : ""}
              </span>
            ));
            }
        
          return errores;
        }}}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await upPatient(params.id, values);
            toast.success(
              "El paciente " + values.nombre + " se ha actualizado correctamente"
            );
            router.push("/administration");
          } else {
            await crPatient(values);
            toast.success(
              "El paciente " + values.nombre + " se ha guardado correctamente"
            );
            window.location.reload();
          }
          setAdministration({
            nombre: "",
            direccion: "",
            celular: "",
            hmedico: ""
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-md-6 p-4">
                <div className="d-flex flex-row">
                  {params.id ? (
                    <div className="col-sm-1 flex-column d-flex">
                      <IconArrowLeft
                        className="mt-1"
                        type="button"
                        onClick={() => router.push(`/administration/`)}
                        color="grey"
                        size={28}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col-md-8 flex-column  d-flex">
                    <h2>
                      {params.id
                        ? "Editar Paciente"
                        : "Crear un nuevo Paciente"}
                    </h2>
                  </div>
                </div>
                <p className="error pl-5">{msg}</p>

                <fieldset>
                  <div className="form-group">
                    <label className="form-label mt-4" >
                      Nombre Completo del Paciente
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inserte aqui el nombre del paciente..."
                      data-listener-added_8ef6daa8="true"
                      name="nombre"
                      onChange={handleChange}
                      value={values.nombre}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.name && errors.name && (
                        <span>{errors.name}</span>
                      )}
                    </small>
                  </div>

                  <div className="form-group">
                    <label className="form-label mt-4">
                      Ingrese la dirección del paciente
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese la dirección del paciente.."
                      name="direccion"
                      onChange={handleChange}
                      value={values.direccion}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.direccion && errors.direccion && (
                        <span>{errors.direccion}</span>
                      )}
                    </small>
                  </div>

                  <div className="form-group">
                    <label
                  
                      className="form-label mt-4"
                    >
                      Celular
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese el número celular del paciente"
                      name="celular"
                      onChange={handleChange}
                      value={values.celular}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.celular && errors.celular && (
                        <span>{errors.celular}</span>
                      )}
                    </small>
                  </div>
                      
                  <div className="form-group">
                    <label
                  
                      className="form-label mt-4"
                    >
                      Historial Médico
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese el número de historial médico del paciente"	
                      name="hmedico"
                      onChange={handleChange}
                      value={values.hmedico}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.hmedico && errors.hmedico && (
                        <span>{errors.hmedico}</span>
                      )}
                    </small>
                  </div>
                  
                </fieldset>
                

                <div className="mt-4">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={clearInput}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar y Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdministrationForm;
