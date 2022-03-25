const express = require('express');
const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('productos.txt');

const app = express();

app.get('/productos', (req, res) => {
  contenedor.getAll().then((products) => {
    res.send(products);
  });
});

app.get('/productoRandom', (req, res) => {
  contenedor.getAll().then((products) => {
    const rand_prod = products[Math.floor(Math.random() * products.length)];
    res.send(rand_prod);
  });
});

app.get('/', (req, res) => {
  res.send(
    `Intenta con <a href=/productos > productos </a>
    o con un <a href=/productoRandom>producto random</a>.`
  );
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
server.on('error', (err) => {
  console.log(err);
});
