import { swaggerDefinition } from "@/config/swagger";

// 手动定义所有 API 文档
export const apiDocs = {
  paths: {
    '/api/login': {      
      post: {
        tags: ['用户'],
        summary: '登录',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string',Comment:'用户名' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['username', 'email', 'password']
              }
            }
          }
        },
        responses: {
          200: {
            description: '登录成功',
            content: {
              'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      username: { type: 'string' },
                      email: { type: 'string', format: 'email' }
                    }
                }
              }
            }
          },
          
        }
      }
    },
  }
};

// 合并基础配置和API文档
export const swaggerSpec = {
  ...swaggerDefinition,
  ...apiDocs
};