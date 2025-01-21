const express = require("express");

const routes = express.Router();



const categoryctl = require("../controllers/categoryCtl");

routes.get("/", categoryctl.addcategory);

routes.post("/insertCategory", categoryctl.insertCategory);

routes.get("/viewcategory", categoryctl.viewcategory);

routes.post('/deleteMultipleCategory',categoryctl.deleteMultipleCategory)

routes.get('/categoryActive',categoryctl.categoryActive)

routes.get('/categoryActiveTrue',categoryctl.categoryActiveTrue)

module.exports = routes;