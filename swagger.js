const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'cse341-project1-xwpn.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

//this will generate the swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);