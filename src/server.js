const express = require('express');
const routes = require('./routes');

const init = async () => {
  const app = express();
  const PORT = 9000;
  const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

  // Middleware for parsing toJSON();
  app.use(express.json());

  // use routes
  app.use('/', routes);

  app.listen(PORT, HOST, () => {
    console.log(`Server berjalan pada http://${HOST}:${PORT}`);
  });
};


init();
