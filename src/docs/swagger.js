const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Documentacion de la Apis Rest Test",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4525",
    },
  ],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "jwt",
      },
    },
    schemas: {
      clientes: {
        type: "object",
        properties: {
          id_cliente: {
            type: "integer",
            example: 1,
          },
          nombre: {
            type: "string",
            example: "Alexis",
          },
          ciudad: {
            type: "string",
            example: "Ciudad del Este"
          },
        },
      },
      cliente: {
        type: "object",
        required: ["nombre, ciudad"],
        properties: {
          nombre: {
            type: "string",
            example: "Alexis",
          },
          ciudad: {
            type: "string",
            example: "Ciudad del Este"
          },
        },
      },
      jsonPlaceHolder:{

      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/db-access/almacen/*.js", "./src/routes/external-calls-apis/*.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);
