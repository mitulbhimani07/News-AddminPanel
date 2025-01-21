const categoryModel = require('../models/categoryModel')
const BlogModel = require('../models/blogModels')

module.exports.home = async(req,res)=>{
    try {
        let BloguserData = await BlogModel.find({blogStatus:true})        
        let categoryUserData =await categoryModel.find()
        return res.render('userPanel/home',{
          BloguserData,
          categoryUserData
        });
      }
      catch (err) {
        console.log(err);
        return res.redirect('back');
      }
}
