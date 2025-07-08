const express= require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();
//routes 

//create controller
router.post('/create',authMiddleware,createCategoryController);

//getAll
router.get('/getAll',getAllCategoryController);

//update cat
router.put('/update/:id',authMiddleware,updateCategoryController);

//delete cat
router.delete('/delete/:id',authMiddleware,deleteCategoryController);

module.exports= router;