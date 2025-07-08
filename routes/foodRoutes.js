const express= require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantIdController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const { get } = require('mongoose');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();
//routes 
//create food
router.post('/create',authMiddleware,createFoodController)

//get food
router.get('/getAll',authMiddleware,getAllFoodController);

//get by id
router.get('/get/:id',authMiddleware,getFoodByIdController);

//get food by restaurant id
router.get('/getByRestaurant/:id',authMiddleware, getFoodByRestaurantIdController);

//update food
router.put('/update/:id',authMiddleware,updateFoodController);

//delete food
router.delete('/delete/:id',authMiddleware,deleteFoodController);

//place order
router.post('/placeOrder',authMiddleware,placeOrderController)

//order status
router.post('/orderStatus/:id', authMiddleware,adminMiddleware,orderStatusController);
module.exports= router; 