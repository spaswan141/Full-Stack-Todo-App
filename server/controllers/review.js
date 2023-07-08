const Review=require('../models/blog.model')

module.exports.review= async function(req, res, next){
    const review= new Review({...req.body})
     review.save()
    return res.send(review)

}
module.exports.getReview= async function(req, res, next){
   const reviews= await Review.find().populate("blogId").lean().exec()
   
   return res.send(reviews)    
}