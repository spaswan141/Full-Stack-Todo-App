const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    title :{type: String, required: true},
    description :{ type: String, required: true},
    body : { type: String, required: true},
    imgUrl:{ type: String, required: true},
    reviews:{ type: Number, default:1},
    createdAt : Date,
   
})

const Blog= model("blog",blogSchema)
module.exports =Blog

