const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async(req, res, next) => {
    try {
        const user= await userModel.findById(req.userId);
        if(user.usertype !== 'admin') {
            return res.status(403).send({
                success: false,
                message: 'Access denied, admin only'
            });
        } else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'UNAUTHORIZED USER',
            error: error.message
        });
    }
};