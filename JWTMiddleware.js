const jwt = require('jsonwebtoken')
const config = require('./config.json');

module.exports = JWTMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: 'You are not Authorized. Please login to continue.'
        });
    }
    jwt.verify(token, config.secret ,function(err, decoded) {
        if(err) {
            console.error(`Error decoding Token - ${err}`);
            return res.status(403).json({
                message: `Invalid Token. Please login again to continue.`
            });
        } else {
            req.auth = decoded;
            next();
        }
    });
};