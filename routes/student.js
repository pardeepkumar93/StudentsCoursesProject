const express = require('express');
const router = express.Router();
const { Course, Student } = require('../models');
const { celebrate, Joi } = require("celebrate");
const { isAuthStudent } = require('../middlewares');
const User = require('../models/User');
const { Schema } = require('mongoose');

router.get(
    '/',
    isAuthStudent,
    async (req, res, next) => {
        const students = await Student.findOne({ _id: req.currentUser._id }).populate('courses').exec();
        res.json(students).status(201);
    });


router.put(
    '/',
    celebrate({
        body: Joi.object({
            first_name: Joi.string().allow(null),
            last_name: Joi.string().allow(null),
            gender: Joi.string().allow(null),
            date_of_birth: Joi.string().allow(null),
            phone: Joi.string().allow(null),
            address: Joi.string().allow(null),
        })
    }),
    isAuthStudent,
    async (req, res, next) => {
        const { course_id } = req.body;
        console.log(req.currentUser)
        await Student.updateOne({ _id: req.currentUser._id }, { $set: { ...req.body } });
        res.json({ success: true }).status(200);
    });

router.post(
    '/add-course',
    celebrate({
        body: Joi.object({
            course_id: Joi.string().required().error(new Error('Course Id is a required field!')),
        })
    }),
    isAuthStudent,
    async (req, res, next) => {
        const { course_id } = req.body;
        console.log(req.currentUser)
        await Student.updateOne({ _id: req.currentUser._id }, { $addToSet: { courses: course_id } });
        res.json({ success: true, id: course_id }).status(201);
    });

router.post(
    '/remove-course',
    celebrate({
        body: Joi.object({
            course_id: Joi.string().required().error(new Error('Course Id is a required field!')),
        })
    }),
    isAuthStudent,
    async (req, res, next) => {
        const { course_id } = req.body;
        await Student.updateOne({ _id: req.currentUser._id }, { $pull: { courses: course_id } });
        res.json({ success: true, id: course_id }).status(201);
    });

module.exports = router;
