const book = require('../models/books');

const newBook = async (req, res, next) => {
  const { body = {} } = req;
  const document = new book(body);
  if (req.file) {
    const { filename } = req.file;

    document.setImage(filename);
  }
  try {
    const doc = await document.save();
    res.status(201);
    res.json({
      succes: true,
      data: doc,
    });
  } catch (err) {
    next(new Error(err));
  }
};

const allBooks = async (req, res, next) => {
  try {
    const docs = await book.find({});
    res.json({
      succes: true,
      data: docs,
    });
  } catch (err) {
    next(new Error(err));
  }
};

const getBookByIsbn = async (req, res, next, isbn) => {
  try {
    const doc = await book.findOne({ Codi_ISBN: isbn });
    if (doc == null) {
      const message = 'Book not found';

      next({
        message,
        statusCode: 404,
        level: 'warm',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(new Error(err));
  }
};

const getByTitol = async (req, res, next) => {
  const titol = req.body;
  try {
    const doc = await book.findOne({ Titol: titol.Titol });

    if (doc == null) {
      const message = 'Book not found';

      next({
        message,
        statusCode: 404,
        level: 'warm',
      });
    } else {
      res.json({
        succes: true,
        data: doc,
      });
    }
  } catch (err) {
    next(new Error(err));
  }
};

const getBook = async (req, res, next) => {
  try {
    const { doc = {} } = req;

    res.json({
      succes: true,
      data: doc,
    });
  } catch (err) {
    next(new Error(err));
  }
};

const updateBook = async (req, res, next) => {
  const { doc = {}, body = {} } = req;
  console.log(doc, body);
  Object.assign(doc, body);

  try {
    const updated = await doc.save();
    res.json({
      succes: true,
      data: updated,
    });
  } catch (err) {
    next(new Error(err));
  }
};

const deleteBook = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const removed = await doc.remove();
    res.json({
      succes: true,
      data: removed,
    });
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = {
  newBook,
  allBooks,
  getBookByIsbn,
  updateBook,
  deleteBook,
  getBook,
  getByTitol,
};
