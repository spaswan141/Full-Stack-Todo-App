const {newuser,loginUser,users,sendPasswordlink,newPassword,verifyLink}=require('../controllers/user')
const router=require('express').Router()


router.post('/signup',newuser)
router.post('/login',loginUser)
router.get("/",users)
router.post("/sentLink",sendPasswordlink)
router.post("/reset-password/:id/:token",newPassword)
router.get("/reset-password/:id/:token",verifyLink)
module.exports=router