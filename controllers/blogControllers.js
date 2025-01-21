const Blog = require("../models/blogModels");
const category = require("../models/categoryModel");



module.exports.addBlog = async (req, res) => {
    try {
        let categoryData = await category.find();
        return res.render("Blog/addBlog", {
            categoryData
        });
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}
module.exports.insertBlog = async (req, res) => {
  try {
    req.body.blogStatus = true;
    console.log(req.files);

    let Blogimage = "";
    let Blogvideo = "";

    if (req.files.Blogimage) {
        console.log("image")
      Blogimage = Blog.imgPath + "/" + req.files.Blogimage[0].filename;
    }
    if (req.files.BlogVideo) {
        console.log("video")
      Blogvideo = Blog.videoPath + "/" + req.files.BlogVideo[0].filename;
    }

    req.body.Blogimage = Blogimage;
    req.body.BlogVideo = Blogvideo;

    let blogData = await Blog.create(req.body);
    if (blogData) {
      console.log("Blog data added successfully");
      return res.redirect("back");
    } else {
      console.log("Data not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Something went wrong:", err);
    return res.redirect("back");
  }
};

module.exports.viewBlog = async (req, res) => {

    let search = "";
    if (req.query.blogSearch) {
        search = req.query.blogSearch;
    }

    let per_page = 3;
    let page = 0;
    if (req.query.page) {
        page = req.query.page
    }
    let blogShow = await Blog.find({

        $or: [

            { titleName: { $regex: search } },

        ]
    }).skip(per_page * page).limit(per_page).populate("categoryId").exec();

    let totalCount = await Blog.find({
        $or: [

            { titleName: { $regex: search } },

        ]

    }).countDocuments();

    var totalPage = Math.ceil(totalCount / per_page);
    return res.render("Blog/viewBlog", {
        blogShow,
        search,
        totalPage,
        page
    })
}



module.exports.updateBlog = async (req, res) => {
    try {
        id = req.query.blogid;
        console.log(id);
        
        let singBlog = await Blog.findById(id);
        const categoryData = await category.find();
        return res.render("Blog/updateBlog", {
            singBlog,
            categoryData
        })
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}

module.exports.editBlog = async (req, res) => {
    try {
        let singleData = await Blog.findByIdAndUpdate(req.body.eid, req.body);
        if (singleData) {
            console.log("data update");
            return res.redirect("/blogs/viewBlog")
        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}