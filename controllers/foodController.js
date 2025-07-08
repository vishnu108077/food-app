const foodModel = require("../models/foodModel");

//create foodcont
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating, ratingCount } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all details"
            })
        }
        const newFood = new foodModel({ title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating, ratingCount });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: "new food added",
            newFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in create food API",
            error
        })
    }
}
//get all food controller
const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if (!foods) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in getAll API',
            error
        })
    }
}

const getFoodByIdController = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by ID API",
            error
        });
    }
}
const getFoodByRestaurantIdController = async (req, res) => {
    try {
        const foods = await foodModel.find({ restaurant: req.params.id });
        if (!foods || foods.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No food found for this restaurant",
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by restaurant ID API",
            error
        });
    }
}
const updateFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
            },
            { new: true }
        );

        if (!updatedFood) {
            return res.status(404).send({
                success: false,
                message: 'No food found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Food updated successfully',
            updatedFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update food API',
            error
        });
    }
}
const deleteFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await foodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).send({
                success: false,
                message: 'No food found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Food deleted successfully',
            deletedFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete food API',
            error
        });
    }
}
//place order
const placeOrderController = async (req, res) => {
    try { 
       const {cart}=req.body;
       if(!cart){
        return res.status(400).send({
            success: false,
            message: "Please provide cart and payment details"
        });
       }
       let total=0;
       //calculate total price
       cart.map((i)=>{
        total+=i.price;
       })
       const newOrder=await foodModel.create({
       foods: cart,
        payment:total,
        buyer: req.body.buyer, // Assuming buyer is passed in the request body
       });
       await newOrder.save();
       res.status(201).send({
        success: true,
        message: "Order placed successfully",
        order: newOrder,
        total
       });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in place order API',
            error
        });
    }
}

const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params.id;
        const { status } = req.body; // Assuming status is passed in the request body
        if (!orderId ) {
            return res.status(400).send({
                success: false,
                message: "Please provide order ID and status"
            });
        }
        const updatedOrder = await foodModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } 
        );
        res.status(200).send({
            success: true,
            message: "Order status updated successfully",
            updatedOrder
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in order status API",
            error
        });
    }
}
module.exports = { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantIdController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController };