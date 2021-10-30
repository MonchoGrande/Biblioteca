const mongoose = require('mongoose');
const { server } = require('../server/config/index');
const Schema = mongoose.Schema;

const bookSchema = Schema({
  Titol: String,
  Autor: String,
  Any_de_publicacio: Number,
  Codi_ISBN: String,
  Pagines: Number,
  Descripcio: String,
  Genere: { type: String, enum: ['Narrativa', 'Lirica', 'Dramatica'] },
  Foto: String,
});
bookSchema.methods.setImage = function setImage(filename) {
  const { host, port } = server;
  this.Foto = `${host}:${port}/image/${filename}`;
};

module.exports = mongoose.model('Books', bookSchema);
