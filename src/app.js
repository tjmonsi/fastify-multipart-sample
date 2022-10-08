import Fastify from 'fastify';
import openApiGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import multipart from '@fastify/multipart';

class Service {
  uploadData (request, response) {
    console.log(request);
    return {
      success: true
    }
  }
}

class Security {}

export async function build () {
  const fastify = new Fastify();

  const service = new Service();
  const securityHandlers = new Security();

  const specification = {
    openapi: '3.0.0',
    info: {
      title: 'App',
      version: '0.0.1'
    },
    paths: {
      '/upload': {
        post: {
          summary: 'Upload',
          operationId: 'uploadData',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary'
                    }                    
                  }
                }                
              }
            }
          },
          responses: {
            200: {
              description: 'success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      }
                    }
                  }
                }
              }              
            }
          }
        }
      }
    }
  }

  const options = {
    specification,
    service,
    securityHandlers,
    noAdditional: true
  };

  /**
   * @type {FastifyRegisterOptions<FastifyDynamicSwaggerOptions>}
   */
  const swaggerOptions = {
    // @ts-ignore
    openapi: specification,
    routePrefix: '/docs',
    exposeRoute: true
  };

  fastify.register(multipart);
  fastify.register(swagger, swaggerOptions);
  fastify.register(openApiGlue, options);
  return fastify;
}