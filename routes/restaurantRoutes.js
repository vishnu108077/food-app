const express= require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantsController, getAllRestaurantsIdController, deleteRestaurantController } = require('../controllers/restaurantController');
const router = express.Router();
//routes 
//create restaurant
router.post('/create',authMiddleware,createRestaurantController)

//get all restaurants

router.get('/getAll',authMiddleware,getAllRestaurantsController)

//get resrtaurant by id
router.get('/getById/:id',authMiddleware,getAllRestaurantsIdController)

//delete restaurant
router.delete('/delete/:id',authMiddleware,deleteRestaurantController)
module.exports= router;