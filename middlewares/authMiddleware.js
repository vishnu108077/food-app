const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // get token
        const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Un-authorize user"
                });
            } else {
                req.userId = decode.id;
                next();
            }
        });

        // req.userId = decode.id;
        // next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Invalid or expired auth token',
            error: error.message
        });
    }
};