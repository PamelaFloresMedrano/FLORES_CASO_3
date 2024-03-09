//Configurar Express
//SERVIDOR BASICO
import express from 'express'
//middleware de Express
import morgan from 'morgan';

import patientRoutes from './routes/patient.routes';

//CORS para permitir que el servidor acepte peticiones de cualquier origen
const cors = require('cors');
const app = express();
// Morgan para ver las peticiones que llegan al servidor
app.use(morgan('dev'));
//Servidor entienda los datos en formato JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        author: 'PAM',
        description: 'API con NodeJS y Express',
        version: '1.0.0'
    })
})
//API GET ruta pacientes
app.use('/api/patients', patientRoutes);

export default app;