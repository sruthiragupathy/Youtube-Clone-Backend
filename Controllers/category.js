const Category = require("../Models/category")
exports.addCategory = async (req, res) => {
    const {name} = req.body;
    const newCategory = new Category({
        name: name
    })
    try {
        const response = await newCategory.save();
        res.json({success: true, response: response})
    }
    catch(error){
        res.json({success: false, response: "Failed to save category"})
    }

}