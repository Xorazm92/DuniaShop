import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Raya Dunia API',
            version: '1.0.0',
            description: 'Raya Dunia elektron do\'koni uchun API',
            contact: {
                name: 'Zufar Bobojonov',
                email: 'rayadunia2021@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:5050',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routers/*.js'] // API yo'llarini o'z ichiga olgan fayllar
};

export const swaggerSpec = swaggerJsdoc(options);
