const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const { celebrate, Joi } = require("celebrate");
const { isAuthStudent, isAuthAdmin } = require('../middlewares')

router.get(
    '/',
    isAuthStudent,
    async (req, res, next) => {
        const course = await Course.find({});
        res.json(course).status(200);
    });

router.post(
    '/',
    celebrate({
        body: Joi.object({
            name: Joi.string().required().error(new Error('Name is a required field!')),
        })
    }),
    isAuthAdmin,
    async (req, res, next) => {
        const { name } = req.body;
        const course = await Course.create({ name });
        res.json({ success: true, id: course.id }).status(201);
    });

router.put(
    '/',
    celebrate({
        body: Joi.object({
            id: Joi.string().required().error(new Error('Id is a required field!')),
            name: Joi.string().required().error(new Error('Name is a required field!')),
        })
    }),
    isAuthAdmin,
    async (req, res, next) => {
        const { id, name } = req.body;
        await Course.updateOne({ _id: id }, { $set: { name: name } });
        res.json({ success: true }).status(200);
    });

router.delete(
    '/:id',
    celebrate({
        params: Joi.object({
            id: Joi.string().required().error(new Error('Id is a required field!')),
        })
    }),
    isAuthAdmin,
    async (req, res, next) => {
        const { id, name } = req.body;
        await Course.deleteOne({ _id: req.params.id })
        res.json({ success: true }).status(200);
    });

module.exports = router;
