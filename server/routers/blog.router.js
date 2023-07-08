const {getBlog,newBlog,deleteBlog,updateBlog,singleBlog}=require('../../servers/controllers/blog')
const router=require('express').Router()


router.get('/blogs',getBlog)
router.get('/blog/:id',singleBlog)
router.post('/create/blog',newBlog)
router.delete("/delete/:id",deleteBlog)
router.put("/update/:id",updateBlog)
module.exports=router