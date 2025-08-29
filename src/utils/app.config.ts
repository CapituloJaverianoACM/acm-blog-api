export const swaggerConfig = {
    documentation: {
      info: {
        title: 'ACM Blog API',
        version: '1.0.0',
        description: 'A REST API for blog comments built with Elysia.js'
      },
      tags: [
        {
          name: 'Comments',
          description: 'Comment management endpoints'
        }
      ]
    }
};

export const welcomeMessage = {
  message: "Welcome to ACM Blog API! 🚀",
  documentation: "Visit /swagger for API documentation",
  endpoints: {
    comments: "/comments",
    swagger: "/swagger"
  }
};