import Patient from '../models/Patient';

// Funciones que operan con la base de datos

export const createPatient = async (req, res) => {
    console.log(req.body);

    const { nombre, direccion, celular, hmedico } = req.body;
    const newPatient = new Patient({ nombre, direccion, celular, hmedico });
    const patientSaved = await newPatient.save();

    res.status(201).json(patientSaved);
};

export const getPatients = async (req, res) => {
    const patients = await Patient.findAll();
    res.json(patients);
};

export const getPatientById = async (req, res) => {
    const patient = await Patient.findByPk(req.params.patientId);
    res.status(200).json(patient);
};

export const updatePatientById = async (req, res) => {
    const [updatedRowsCount, updatedRows] = await Patient.update(req.body, {
        where: {
            id: req.params.patientId
        },
        returning: true
    });

    if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(updatedRows[0]);
};

export const deletePatientById = async (req, res) => {
    const deletedRowCount = await Patient.destroy({
        where: {
            id: req.params.patientId
        }
    });

    if (deletedRowCount === 0) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(204).json();
};
