// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy requests to the backend server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
