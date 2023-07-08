const {createTodo,getTodos,deleteTodo,updateTodo}=require('../controllers/Todo')
const router=require('express').Router()


router.post('/create-todo',createTodo);
router.get("/todos",getTodos)
router.delete("/delete/:id",deleteTodo)
router.put("/update/:id",updateTodo)
module.exports=router