const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { isAuthAdmin } = require('../middlewares');

router.get(
    '/students',
    isAuthAdmin,
    async (req, res, next) => {
        const students = await Student.find({}).populate('courses').exec();
        res.json(students).status(201);
    });

module.exports = router;
