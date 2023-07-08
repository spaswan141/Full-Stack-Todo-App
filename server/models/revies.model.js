const {Schema, model} = require("mongoose")
const mongoose = require('mongoose')
const reviewSchema = new Schema({
   name:{ type: String, required: true},
   review:{ type: String, required: true},
   blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
    required:true
}
})

const Review= model("review",reviewSchema)
module.exports =Review
