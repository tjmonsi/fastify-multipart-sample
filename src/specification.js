export const specification = {
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