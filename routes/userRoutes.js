const express= require('express');
const { getUserController, updateUserController, updatePasswordController,  resetPasswordController, deleteProfileController } = require('../controllers/UserContoller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
//routes 

router.get('/getUser',authMiddleware, getUserController);

//update profile
router.put('/updateUser',authMiddleware,updateUserController);

//update password
router.post('/updatePassword',authMiddleware,updatePasswordController)

//reset password]
router.post('/resetPassword',authMiddleware,resetPasswordController)

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports= router;