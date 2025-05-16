import { SwaggerDefinition } from 'swagger-jsdoc';

export const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API文档',
    version: '1.0.0',
    // description: 'This is a simple Koa API with Swagger documentation'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    // schemas: {
    //   User: {
    //     type: 'object',
    //     properties: {
    //       id: { type: 'integer' },
    //       username: { type: 'string' },
    //       email: { type: 'string', format: 'email' }
    //     }
    //   },
    //   Error: {
    //     type: 'object',
    //     properties: {
    //       status: { type: 'integer' },
    //       message: { type: 'string' }
    //     }
    //   }
    // }
  }
};