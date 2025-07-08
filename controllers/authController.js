const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")

//register 
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        //check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'User already exists'
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //create user
        const user = await userModel.create({ userName, email, password: hashedPassword, phone, address, answer })
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide Email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            })
        }
        //check user | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        });
    }
}
module.exports = { registerController, loginController } 