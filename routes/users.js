const express = require('express');
const router = express.Router();

// middlewares
const { capitalizeName } = require('../middlewares/funnel');
// controllers
const { getUser, addUser } = require('../controllers/users');
router.route('/login').post(getUser);
router.route('/signup').post(capitalizeName, addUser);

module.exports = router;
