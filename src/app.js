import Fastify from 'fastify';
import openApiGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import multipart from '@fastify/multipart';
import { specification } from './specification.js'

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