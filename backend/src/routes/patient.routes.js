import {Router} from 'express';
const router = Router();

import * as patientsCtrl from '../controller/patients.controller';

router.get('/', patientsCtrl.getPatients);
router.post('/', patientsCtrl.createPatient);
router.get('/:patientId', patientsCtrl.getPatientById);
router.put('/:patientId', patientsCtrl.updatePatientById);
router.delete('/:patientId', patientsCtrl.deletePatientById);


export default router;