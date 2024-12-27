const User = require('../models/User');
const { customError } = require('../errors/customError');

const getUser = async (req, res) => {
    // console.log(req.body);
    const user = await User.findOne(req.body);
    if (!user) {
        throw customError('Email or password incorrect.', 404);
    }
    res.status(200).json(user);
};

const addUser = async (req, res) => {
    // console.log(`${req.body} + 'body'`);
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
        res.status(400).send('Email has been used by another user.');
        return;
    }
    const user = await User.create(req.body);
    if (!user) {
        throw customError('Bad request.', 401);
    }

    res.status(201).json(user);
};

module.exports = {
    getUser,
    addUser,
};
