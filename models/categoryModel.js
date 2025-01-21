const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },
    categorystatus: {
        type: Boolean,
        default: true
    },
    blogid: {
        type: Array
    }
}, {
    timestamps: true
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category