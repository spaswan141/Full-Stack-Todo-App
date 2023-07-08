const Blog= require('../models/blog.model')


module.exports.getBlog=async function (req, res){
  
    let blog= await Blog.find()
    try{
        return res.status(200).send(blog)
    }catch(err){
        return res.send(501).send(err)
    }
}
module.exports.singleBlog=async function(req, res){
    const {id}=req.params
    const blog=await Blog.findById(id)
    try{
        return res.send(blog)

    }catch(err){
        return res.send(err)
    }
}
module.exports.newBlog=function (req, res){
    let createBlog= new Blog({...req.body,createdAt:new Date()})
    createBlog.save((err, blog)=>{
        res.status(201).send(blog["_doc"]);
     });
}
module.exports.deleteBlog=async function(req, res){
    const {id}= req.params
   const blog =await Blog.findByIdAndDelete(id)
   res.send("Blog Deleted") 
}

module.exports.updateBlog= async function (req, res){
    const {id} = req.params
    const blog =await Blog.findByIdAndUpdate(id,{...req.body,createdAt:new Date()}).then(()=>{
     res.status(200).send("Updated Succcesfully")
    })
}
// module.export.review =async function(req, res, next) {
    
//     const reviews = {
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//         user: req.user._id,
//       }
//       Blog.reviews.push(review)

//       Blog.numReviews = Blog.reviews.length
//   }

  
