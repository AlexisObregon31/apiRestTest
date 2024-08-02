const express = require("express");
const router = express.Router();
const axios = require("axios");




/**
 * Get publicaciones from jsonPlaceHolder
 * @openapi
 * /jsonPlaceHolder/listar-publicaciones:
 *    get:
 *      tags:
 *        - jsonPlaceHolder
 *      summary: "Listar publicaciones desde una api externa llamada jsonPlaceHolder"
 *      description: End point utilizado para obtener las publicaciones desde una api externa llamada jsonPlaceHolder.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/jsonPlaceHolder"
 *      responses:
 *        '200':
 *          description: Los datos de las publicaciones retornaron con éxito.
 *        '500':
 *          description: Error al obtener el listado de las publicaciones.
 *      security:
 *       - jwt: []
 */
//GET
router.get('/jsonPlaceHolder/listar-publicaciones', async (req, res) => {
  let url = "https://jsonplaceholder.typicode.com/posts";

  console.log(`Listando publicaciones desde ${url}`);

  try {

    let datos = await axios.get(url, "", { responseType: "json" });

    res.status(200);
    res.json(datos.data);

  } catch (error) {
    res.status(503);
  }
});

//POST
router.post('/jsonPlaceHolder/crear-publicacion', async (req, res) => {
  let url = "https://jsonplaceholder.typicode.com/posts";

  console.log(`Creando una nueva publicacion en ${url}`);

  try {

    let datos = await axios.post(url, JSON.stringify({ title: 'foo', body: 'bar', userId: 1,}), { responseType: "json", headers: {'Content-type': 'application/json; charset=UTF-8',} });

    res.status(201);
    res.json(datos.data);

  } catch (error) {
    res.status(503);
  }
});


module.exports = router;
