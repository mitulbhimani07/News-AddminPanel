const express = require("express");

const routes = express.Router();


const blogModels = require('../models/blogModels')
const blogCtl = require("../controllers/blogControllers");


routes.get("/", blogCtl.addBlog);

routes.post("/insertBlog",blogModels.uploadImageFile, blogCtl.insertBlog);

routes.get("/viewBlog", blogCtl.viewBlog);

routes.get("/updateBlog", blogCtl.updateBlog);

routes.post("/editBlog", blogCtl.editBlog)

module.exports = routes;