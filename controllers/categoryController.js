//create cat

const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        //validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'provide all details'
            })
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: 'Category created',
            newCategory
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: 'error in category API',
                error
            });
    }
};

//getAll controller
const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No Categories found",
            });
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getAll API",
            error
        })
    }
}

//update controller
const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, imageUrl } = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: 'NO category found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'category updated successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in update API',
            error
        })
    }
}

//delete cont

const deleteCategoryController=async(req,res)=>{
    try{
        const{ id}=req.params
        if(!id){
            res.status(500).send({
                success:false,
                message:"id is not valid"
            })
        }
        const category= await categoryModel.findById(id)
        if(!category){
            return res.status(404).send({
                success:false,
                message:"no category found with this id"
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete category API"
        });
    };
};
module.exports = { createCategoryController, getAllCategoryController, updateCategoryController ,deleteCategoryController};