const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Social Media ToDo',
    version,
  },
  servers: [
    {
      url: `https://pronghorn-leather-jacket.cyclic.app/v1/`,
    },
  ],
};

module.exports = swaggerDef;
