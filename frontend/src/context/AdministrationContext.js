"use client"

import { useState, createContext, useContext } from "react";
import { getAllPatients, getPatient, createPatient, updatePatient, deletePatient } from "@/api/PatientsApi";

const contextAdministration = createContext();
// Hook para acceder al contexto
export const useAdministrations = () => {
    const context = useContext(contextAdministration);
    if (context === undefined) {
        throw new Error("Se debe usar con un Provider")
    }
    return context;

}

export const Administration = ({ children }) => {
    const [administrations, setAdministrations] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadPatients() {
        try {
            const response = await getAllPatients();
            setAdministrations(response.data);
            setMsg(response.data.msg);
        } catch (error) {
            //setMsg(error.response.data.msg);
            //setMsg(error.data.msg);
        }
    }

    const gtPatient = async (id) => {
        try {
            const response = await getPatient(id);
            setMsg(response.data.msg);
            return response.data;
        } catch (error) {
            setMsg(error.data.msg);
        }
    }

    const crPatient = async (patient) => {
        try {
            const response = await createPatient(patient);
            setMsg(response.data.msg);
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    const upPatient = async (id, newFields) => {
        try {
            const response = await updatePatient(id, newFields);
            setMsg(response.data.msg);
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const delPatient = async (id) => {
        try {
            const response = await deletePatient(id);
            setAdministrations(administrations.filter(patient => patient.id !== id));
            setMsg(response.data.msg);
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    return (
        <contextAdministration.Provider value={{ administrations, loadPatients, gtPatient, crPatient, upPatient, delPatient, msg }}>
            {children}
        </contextAdministration.Provider>
    )
}