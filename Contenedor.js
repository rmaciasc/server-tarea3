const fs = require('fs');

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  async save(objeto) {
    let content = [];
    try {
      // try to read content
      content = await fs.promises.readFile(this.filename, 'utf8');
      if (content.length > 0) {
        console.log('content: ', content);
        content = JSON.parse(content);
      } else {
        console.log(`El archivo ${this.filename} está vacío.`);
        content = [];
      }
    } catch (err) {
      console.log(`${this.filename} no fue encontrado, creando archivo...`);
      objeto.id = 1;
      await fs.promises.writeFile(this.filename, JSON.stringify([objeto]));
      return objeto.id;
    }

    try {
      // append new object to content
      const currentId = content.length;
      objeto.id = currentId + 1;
      content.push(objeto);
      await fs.promises.writeFile(this.filename, JSON.stringify(content));
      console.log('Objeto guardado!!');
    } catch (err) {
      console.log(`Error al guardar ${this.filename}: ${err}`);
    }
  }

  async getById(id) {
    let content = [];
    let foundObject = {};
    try {
      content = await fs.promises.readFile(this.filename, 'utf-8');
      if (content.length > 0) {
        content = JSON.parse(content);
        foundObject = await content.find((x) => x.id === id);
      } else {
        console.log(`${this.filename} está vacío`);
        return null;
      }
    } catch (error) {
      console.log(`${this.filename} no fue encontrado. Error: ${error}`);
    }
    return foundObject;
  }

  async getAll() {
    let content = [];
    try {
      content = await fs.promises.readFile(this.filename, 'utf-8');
      if (content.length > 0) {
        content = JSON.parse(content);
      } else {
        console.log(`${this.filename} está vacío`);
        return null;
      }
    } catch (error) {
      console.log(`${this.filename} no fue encontrado. Error: ${error}`);
    }
    return content;
  }

  async deleteById(id) {
    try {
      let content = await fs.promises.readFile(this.filename, 'utf-8');
      if (content.length > 0) {
        content = JSON.parse(content);
        const objectIndex = content.findIndex((x) => x.id === id);
        console.log(objectIndex);
        content.splice(objectIndex, 1);
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(content, null, 2),
          'utf-8'
        );
        console.log(`${id} ha sido eliminado de ${this.filename}`);
      } else {
        console.log(`${this.filename} está vacío`);
        return null;
      }
    } catch (error) {
      console.log(`${this.filename} no fue encontrado. Error: ${error}`);
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.filename, []);
  }
}

module.exports = Contenedor;
