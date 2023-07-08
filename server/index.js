require("dotenv").config()
const express=require('express')
const cors=require('cors')
const connection = require("./db");
const authRouter=require('./routers/user.router');
const todoRouter= require("./routers/todo.router")
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler')
const app = express()
connection();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use("/user",authRouter)
app.use("/todo",todoRouter)

app.use("/",(req, res, next) =>{
    res.send("Working") 
})
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
