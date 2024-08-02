const express = require("express");
const router = express.Router();
const poolConnection = require("../../../db-connections/postgres/almacen.connection");

//GET

/**
 * Listar clientes
 * @openapi
 * /almacen/clientes/list:
 *    get:
 *      tags:
 *        - clientes
 *      summary: "Listar clientes en la base de datos Almacen"
 *      description: "End point utilizado para obtener el listado general de los clientes de la base de datos almacen."
 *      responses:
 *        '200':
 *          description: El listado de clientes se ha obtenido con éxito.
 *          content:
 *          application/json:
 *            schema:
 *              type: object
 *              additionalProperties:
 *                type: integer
 *                format: int32
 *        '500':
 *          description: Error al obtener el listado de clientes.
 *      security:
 *       - jwt: []
 */
router.get("/almacen/clientes/list", async (req, res) => {
  console.log(`Listando clientes de la db Almacen`);
  let datos;
  let statusCode;
  let message;
  try {

    let connection = await poolConnection.poolDb();

    await connection.query(`select * from clientes`, { type: connection.QueryTypes.SELECT })
      .then((clientes) => {
        datos = clientes;
        statusCode = 200;
        message = "success: Listado de clientes";
      });

  } catch (error) {
    console.log("Error al obtener el listado de clientes " + error);
    statusCode = 500;
    message = `error: ${error}`;
  }

  if (datos) res.json(datos);
  res.status(statusCode);
  res.message(message);
});


/**
 * Buscar un cliente por id
 * @openapi
 * /almacen/clientes/find/:id:
 *    get:
 *      tags:
 *        - clientes
 *      summary: "Obtener un cliente en la basde de datos almacen"
 *      description: "End point que obtiene un cliente pasando como parámetro el id del cliente que se desea obtener de la base de da datos almacen."
 *      parameters:
 *      - name: id_cliente
 *        in: path
 *        description: ID del cliente
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      responses:
 *        '200':
 *          description: Los datos del cliente fueron obtenidos con éxito.
 *        '500':
 *          description: Error al obtener los datos del cliente.
 *      security:
 *       - jwt: []
 */
router.get("/almacen/clientes/find/:id", async (req, res) => {

  let datos;
  let statusCode;
  let message;

  try {

    let id_cliente = req.params.id_cliente;
    console.log(`Buscando cliente con id: ${id_cliente} de la db Almacen`);

    let connection = await poolConnection.poolDb();

    await connection.query(`select * from clientes where id_cliente = ${id_cliente}`, {type: connection.QueryTypes.SELECT,})
      .then((cliente) => {
        datos = cliente;
        statusCode = 200;
        message = `success: Datos de cliente ${id_cliente}`;
      });

  } catch (error) {
    console.log(
      `Error al buscar el cliente con id: ${id_cliente} de la db Almacen: ${error}`
    );
    statusCode = 503;
    message = `error: ${error}`;
  }

  if (datos) res.json(datos);
  res.status(statusCode);
  res.message(message);
});





//POST



/**
 * Crear un nuevo cliente
 * @openapi
 * /almacen/clientes/create:
 *    post:
 *      tags:
 *        - clientes
 *      summary: "Registrar un nuevo cliente en la base de datos almacen"
 *      description: "End point para insertar un nuevo cliente en la base de datos almacen, pasando como clave : valor en el body de la petición los datos a ser insertados."
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/cliente"
 *          required: true
 *      responses:
 *        '201':
 *          description: El cliente fue insertado con éxito.
 *        '500':
 *          description: Error al insertar el cliente.
 *      security:
 *       - jwt: []
 */
router.post("/almacen/clientes/create", async (req, res) => {

  let statusCode;
  let message;

  try {

    console.log(`Creando nuevo cliente en db almacen`);
    let nombre = req.body.nombre;
    let ciudad = req.body.ciudad;
    let clienteInsertado;

    let connection = await poolConnection.poolDb();

    await connection.query(`insert into clientes (nombre, ciudad) values ('${nombre}', '${ciudad}')`,{ type: connection.QueryTypes.INSERT }
      ).then(async (retorno) => {
        await connection.query(`select * from clientes where nombre = ${nombre} and ciudad = ${ciudad}`, {type: connection.QueryTypes.SELECT,})
        .then((cliente) => {
          clienteInsertado = cliente
        });
        statusCode = 201;
        message = "success: Cliente insertado con éxito";
      });

    res.json(datos);
  } catch (error) {
    console.log("Error al insertar el cliente en la db almacen: " + error);
    statusCode = 500;
    message = `error: ${error}`;
  }
  res.json(clienteInsertado);
  res.status(statusCode);
  res.message(message);
});





//PUT


/**
 * Modificar un cliente
 * @openapi
 * /almacen/clientes/update:
 *    put:
 *      tags:
 *        - clientes
 *      summary: "Modificar un cliente en la base de datos almacen"
 *      description: "End point para actualizar los datos de un cliente existente en la base de datos almacen, pasando como clave : valor el id_cliente en el body de la petición."
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/clientes"
 *      responses:
 *        '202':
 *          description: El cliente fue modificado con éxito.
 *        '500':
 *          description: Error al modificar el cliente.
 *      security:
 *       - jwt: []
 */
router.put("/almacen/clientes/update", async (req, res) => {

  let statusCode;
  let message;

  try {

    let id_cliente = req.body.id_cliente;
    console.log(`Actualizando cliente con id: ${id_cliente} en db almacen`);
    let nombre = req.body.nombre;
    let ciudad = req.body.ciudad;

    let connection = await poolConnection.poolDb();

    await connection.query(`update cliente set nombre = ${nombre}, ciudad = ${ciudad} where id_cliente = ${id_cliente}`,{ type: connection.QueryTypes.UPDATE }
      ).then((retorno) => {
        statusCode = 202;
        message = "success: Cliente modificado con éxito";
      });

  } catch (error) {
    console.log(
      `Error al actualizar el cliente con id: ${id_cliente} de la db Almacen: ${error}`
    );
    statusCode = 500;
    message = `error: ${error}`;
  }

  res.status(statusCode);
  res.message(message);
});





//DELETE


/**
 * Eliminar un cliente
 * @openapi
 * /almacen/clientes/delete:
 *    delete:
 *      tags:
 *        - clientes
 *      summary: "Eliminar un cliente de la base de datos almacen"
 *      description: "End point para eliminar un cliente de la base de datos almacen, pasando como clave : valor el id_cliente en el body de la petición."
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/clientes"
 *      responses:
 *        '201':
 *          description: El cliente fue eliminado con éxito.
 *        '500':
 *          description: Error al eliminar el cliente.
 *      security:
 *       - jwt: []
 */
router.delete("/almacen/clientes/delete", async (req, res) => {

  let statusCode;
  let message;

  try {

    let id_cliente = req.params.id_cliente;
    console.log(`Eliminando cliente con id: ${id_cliente} en db almacen`);

    let connection = await poolConnection.poolDb();

    await connection.query(`delete cliente where id_cliente = ${id_cliente}`, { type: connection.QueryTypes.DELETE,
    }).then((retorno) => {
        statusCode = 201;
        message = "success: Cliente eliminado con éxito";
      });

  } catch (error) {
    console.log("Error al obtener el listado de clientes: " + error);
    statusCode = 500;
    message = `error: ${error}`;
  }

  res.status(statusCode);
  res.message(message);
});


module.exports = router;
