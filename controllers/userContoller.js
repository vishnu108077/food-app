const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs")
//get user info
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.userId });
        // const user = await userModel.findById({ _id: req.body.id});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        //hide password
        user.password = undefined
        //response
        res.status(200).send({
            success: true,
            message: "User Get successfully",
            user
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Get User API',
            error
        })
    }
};

//update user 
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.userId})
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone
        //save
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Update User API",
            error
        })

    }
}

//update user password
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.userId })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not found",
            })
        }
        //get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            res.status(500).send({
                success: false,
                message: "please provide old or new password"
            })
        }
        //check user password | compare password
        const ismatch = await bcrypt.compare(oldPassword, user.password);
        if (!ismatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Old password"
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password=hashedPassword;
        await user.save()
        res.status(200).send({
            success:true,
            message:"password updated",
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Password Update API",
            error
        })
    }
}
const resetPasswordController=async(req,res)=>{
    try{
        const {email,newPassword,answer}=req.body;
        //validation 
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"PLease Provide all details"
            })
        }
        const user =await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found or invalid answer"
            })
        }
         //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password=hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password reset successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in reset api"
        })
    }
}
//delete profile
const deleteProfileController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params._id);
        return res.status(200).send({
            success:true,
            message:"Profile deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete profile api",
            error
        })
        
    }
}
module.exports = { getUserController, updateUserController, updatePasswordController ,resetPasswordController,deleteProfileController};
