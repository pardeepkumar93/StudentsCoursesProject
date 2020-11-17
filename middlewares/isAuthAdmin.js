const jwt = require('jsonwebtoken');
/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 
 */
const isAuthAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (
        (authHeader && authHeader.split(' ')[0] === 'Token') ||
        (authHeader && authHeader.split(' ')[0] === 'Bearer')
    ) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user.role == 'admin') {
                req.currentUser = user;
                next();
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};


module.exports = isAuthAdmin;