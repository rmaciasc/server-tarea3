const express = require('express');
const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('productos.txt');

const app = express();

app.get('/productos', (req, res) => {
  contenedor.getAll().then((products) => {
    // res.send(`Vamos a ver ${JSON.stringify(products, null, 2)}`);
    res.send(products);
  });
});

app.get('/productoRandom', (req, res) => {
  contenedor.getAll().then((products) => {
    const rand_prod = products[Math.floor(Math.random() * products.length)];
    res.send(rand_prod);
  });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
server.on('error', (err) => {
  console.log(err);
});
