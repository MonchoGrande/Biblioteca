const router = require('express').Router();

const upload = require('../server/storage');
const controller = require('../controllers/controller');

router.get('/', (req, res, next) => {
  res.json({
    message: 'Get all books',
  });
});

router.post('/newbook', upload.single('Foto'), controller.newBook);

router.get('/allbooks', controller.allBooks);

router.get('/cercador', controller.getByTitol);

router.param('isbn', controller.getBookByIsbn);

router
  .route('/book/:isbn')
  .get(controller.getBook)
  .put(controller.updateBook)
  .delete(controller.deleteBook);

module.exports = router;
