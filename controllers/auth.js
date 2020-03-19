const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // check password true
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // generate token, passwords match
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            // passwords dont match
            res.status(401).json({
                message: 'Password doesn\'t match'
            });
        }
    } else {
        // check password error
        res.status(404).json({
            message: 'User doesn\'t exist.'
        });
    }
};

module.exports.register = async function(req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // message error
        res.status(409).json({
            message: 'User already exist.'
        });
    } else {
        // create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};
