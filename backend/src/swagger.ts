import { Express } from 'express';


let swaggerJsdoc = require('swagger-jsdoc');
let swaggerUi = require('swagger-ui-express');

export function setupSwagger(app: Express): void {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API con Swagger y JWT',
                version: '1.0.0',
                description: 'Documentación de la API con autenticación JWT',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [{ bearerAuth: [] }],
        },
        apis: ['./src/routes/*.ts'],
    };

    const openapiSpecification = swaggerJsdoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

