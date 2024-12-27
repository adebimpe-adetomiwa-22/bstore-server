const express = require('express');
const router = express.Router();

const { getBooks, getBook, getStaticBooks } = require('../controllers/books');

router.route('/').get(getBooks);
router.route('/:bookID').get(getBook);
router.route('/static/books').get(getStaticBooks);

module.exports = router;
