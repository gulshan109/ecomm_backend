const express = require("express");
const { connectDb } = require("./config/database.js");
const { PORT } = require("./config");
const userRouter = require("./router/user.router.js");
const categoryRouter = require("./router/category.router.js")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRouter = require("./router/products.router.js");
// const morgan = require("morgan");

// database config
connectDb()

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
));
// app.use(morgan("dev"))

app.use(express.urlencoded({extended :true}));

// routes
app.use("/user" , userRouter);
app.use("/category",categoryRouter);
app.use("/products" , productRouter);

// run listen
app.listen(PORT , (err)=>{
    if(err) throw err
    console.log("server running...");
    
})