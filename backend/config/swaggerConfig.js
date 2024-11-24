const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chinook API",
      version: "1.0.0",
      description: "API documentation for the Chinook application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Backend sunucunuzun URL'si
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
