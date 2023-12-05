import { Application } from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options: Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello Welcome API Documentation',
        version: '1.0.0',
        description: 'Documentation for Hello Welcome Express API',
      },
      basePath: '/api',
    },
    apis: ['./src/routes/*.ts'],
};
  

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application) {
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
}
