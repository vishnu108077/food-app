//create restauarant

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
    try {
        const { title, imageURL, foods, time, pickup, delivery, isopen, logoURL, rating, ratingCount, code, coords } = req.body;
        //validation'
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: 'provide title or address',
            });
        }
        const newRestaurant = new restaurantModel({ title, imageURL, foods, time, pickup, delivery, isopen, logoURL, rating, ratingCount, code, coords })
        await newRestaurant.save();
        res.status(201).send({
            success: true,
            message: 'new restaurant created'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in create restaurant api',
            error
        })

    }
}
// getRestaurantsController
const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.find({})
        if (!restaurant) {
            res.status(404).send({
                success: false,
                message: 'No restaurants available'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: restaurant.length,
            restaurant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in get API ",
            error
        })
    }
}

const getAllRestaurantsIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: "Please Provide Resturnat ID",
            });
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "no restaurant found",
            });
        }
        res.status(200).send({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Resturarnt by id api",
            error,
        });
    }
}

//delete restaurant 
const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: 'invalid restaurantID'
            })
        }
        const restaurant = await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success: true,
            message: "Resturant Deleted Successfully",
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: 'error in delete API',
                error
            });
    };
}
module.exports = { createRestaurantController, getAllRestaurantsController, getAllRestaurantsIdController, deleteRestaurantController };