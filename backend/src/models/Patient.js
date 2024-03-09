const Sequelize = require('sequelize');
// Conectar a la base de datos
const sequelize = new Sequelize('citas_medicas', 'root', '*Admin1*', {
    host: 'localhost',
    dialect: 'mysql'
});

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

  // Crear modelo de paciente
const Patient = sequelize.define('patients', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    hmedico: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    tableName: 'pacientes'
});


export default Patient;
module.exports = Patient;