const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, Student } = require('../models');
const { celebrate, Joi } = require("celebrate");
const jsonwebtoken = require('jsonwebtoken');
router.post(
    '/signup',
    celebrate({
        body: Joi.object({
            first_name: Joi.string().required().error(new Error('FirstName is a required field!')),
            last_name: Joi.string().required().error(new Error('LastName is a required field!')),
            email: Joi.string().required().error(new Error('Email is a required field!')),
            password: Joi.string().required().error(new Error('Password is a required field!')),
        })
    }),
    async (req, res, next) => {
        const { email, password, first_name, last_name } = req.body;
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (user) {
            return res.send({ success: false, message: 'Email already in use!' })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const record = await User.create({
            email, password: hash, first_name, last_name, role: 'student'
        });
        await Student.create({ first_name, last_name, _id: record._id });
        res.json({ success: true, id: record.id }).status(201);
    });
router.post(
    '/signin',
    celebrate({
        body: Joi.object({
            email: Joi.string().required().error(new Error('Email is a required field!')),
            password: Joi.string().required().error(new Error('Password is a required field!')),
        })
    }),
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.send({ success: false, message: 'Invalid email' })
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.send({ success: false, message: 'Invalid password' })
        }
        const token = jsonwebtoken.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: 86400 });

        res.json({ success: true, user, token }).status(201);
    });
module.exports = router;
