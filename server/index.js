require("dotenv").config()
const express=require('express')
const cors=require('cors')
const connection = require("./db");
const blogRouter=require('./routers/blog.router')
const reviewRouter=require('./routers/review.router')
const app = express()
connection();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",["https://shubham-paswan-blog.netlify.app"],"*",);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",'GET,PUT,DELETE,POST');
    next();
});

app.use("/",blogRouter);
app.use('/',reviewRouter)
app.use("/",(req, res, next) =>{
res.send("done")
})
const Port = process.env.Port || 8080;
app.listen(Port, () => {
  console.log(`listening on port http://localhost:${Port}`);
});




