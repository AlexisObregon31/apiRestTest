const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const upload = multer({ dest: "archivos/" });
const cors = require('cors');
const PORT = process.env.PORT || 4525;
const swaggerUi  = require("swagger-ui-express");
const swaggerSetup = require("./docs/swagger");

const jsonPlaceHolder = require("./routes/external-calls-apis/jsonplaceholder.route");
const clientesRoutes = require("./routes/db-access/almacen/clientes.route");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

async function initServiceApiRest() {
  console.log(`Ejecutando Servicio Api Rest Test \n 
                Definiendo rutas...\n\n`);


  //***Listado de rutas accesibles por la API***


  //**Rutas de consumo de APIS externas**

  //*jsonPlaceHolder*
  //GET 
  app.get("/jsonPlaceHolder/listar-publicaciones", jsonPlaceHolder);



  //**Rutas de acceso a las bases de datos**

  //*Almacen*
  //GET 
  app.get("/almacen/clientes/list", clientesRoutes);

  //POST
  app.post("/almacen/clientes/create", clientesRoutes);

  //PUT
  app.put("/almacen/clientes/update", clientesRoutes);

  //DELETE
  app.delete("/almacen/clientes/delete", clientesRoutes);
  

  try {
    app.listen(PORT);
    console.log(`¡ API REST puesta en ejecución en la puerta ${PORT}!`);

  } catch (error) {
    console.log(`¡ Error al disponibilizar la API en el puerto ${PORT} !`);
  }
}

module.exports = { initServiceApiRest };
