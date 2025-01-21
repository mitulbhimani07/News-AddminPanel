const { query } = require("express");
const category = require("../models/categoryModel");




module.exports.addcategory = async (req, res) => {
    try {
        return res.render("category/addcategory");
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}

module.exports.insertCategory = async (req, res) => {
    try {
        req.body.categorystatus = true;
        console.log(req.body);
        let categoryData = await category.create(req.body);
        
        if (categoryData) {
            console.log("category add successfully");
            return res.redirect("back")
        }
        else {
            console.log("query is not perform");
            return res.redirect("back")
        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back")
    }
}
module.exports.viewcategory = async (req, res) => {


    let search = '';
    if (req.query.categorysearch) {
        search = req.query.categorysearch
    }

    let per_page = 5;
    let page = 0;
    if (req.query.page) {
        page = req.query.page
    }

    let categoryshow = await category.find({
        $or: [

            { categoryname: { $regex: search } }

        ]
    }).skip(per_page * page).limit(per_page);

    let totalcount = await category.find({
        $or: [

            { categoryname: { $regex: search } }

        ]

    }).countDocuments();

    var totalpage = Math.ceil(totalcount / per_page);
    return res.render("category/viewcategory", {
        categoryshow,
        search,
        totalpage,
        page
    })

}
module.exports.deleteMultipleCategory = async (req,res)=>{
    try{
        console.log(req.body);
        let CategoryDelete = await category.deleteMany({_id:{$in:req.body.Ids}});
        if (CategoryDelete) {
            return res.redirect("back")
        }
        else{
            console.log("something is wrong");
            return res.redirect("back")

        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back")
    }
}
module.exports.categoryActive = async (req,res) =>{
    try{
        console.log(req.query);
        let categorystatus = await category.findByIdAndUpdate(req.query.categoyIds ,{categorystatus : false})
        if (categorystatus) {
            return res.redirect("back")
        }
        else{
            console.log("something is wrong");
            return res.redirect("back")
        }
    }catch{
        console.log("something is wrong");
        return res.redirect("back")
    }
}
module.exports.categoryActiveTrue = async (req,res) =>{
    try{
        console.log(req.query);
        let categorystatus = await category.findByIdAndUpdate(req.query.categoyIds ,{categorystatus : true})
        if (categorystatus) {
            return res.redirect("back")
        }
        else{
            console.log("something is wrong");
            return res.redirect("back")
        }
    }catch{
        console.log("something is wrong");
        return res.redirect("back")
    }
}