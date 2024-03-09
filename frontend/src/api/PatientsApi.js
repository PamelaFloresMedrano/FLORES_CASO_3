import axios from 'axios';


export const getAllPatients = async () => 
    await axios.get('http://localhost:3000/api/patients');


export const getPatient = async (id) => 
    await axios.get(`http://localhost:3000/api/patients/${id}`);


export const createPatient = async (patient) => 
    await axios.post('http://localhost:3000/api/patients', patient);

export const updatePatient = async (id, newFields) => 
    await axios.put(`http://localhost:3000/api/patients/${id}`, newFields);


export const deletePatient = async (id) => 
    await axios.delete(`http://localhost:3000/api/patients/${id}`);