const Sequelize = require("sequelize");


var sequelize;

async function poolDb() {
  try {
    sequelize = await new Sequelize("db_almacen", "postgres", "admin", {
      host: "localhost",
      dialect:
        "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      pool: {
        max: 10, //Cantidad maxima permitida para conexiones abiertas dentro del pool
        min: 0,  //Cantidad minima permitida para conexiones abiertas dentro del pool
        acquire: 60000, //Tiempo màximo de reintento de conexiòn en milisegundos caso de fallar la conexiòn
        idle: 10000,    //Tiempo maximo permitido de inactividad para una conexiòn abierta, luego de ello la conexiòn es liberada
      },
    });
    console.log("La conexion a la db Almacen fue establecida satisfactoriamente.");
  } catch (error) {
    sequelize.close();
    console.error("Error: No se pudo lograr la conexiòn a la base de datos almacèn: ", error);
  }
  return sequelize;
}

/* Funciòn para hacer test de conexiòn a la BD
function probarConexion() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("La conexion fue establecida satisfactoriamente.");
    })
    .catch((error) => {
      console.error("Error: No se pudo lograr la conexiòn a la base de datos: ", error);
      sequelize.close();
    });
}*/

//, { type: QueryTypes.SELECT }

module.exports = {  poolDb };
