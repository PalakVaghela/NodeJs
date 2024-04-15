// ..1.. declare express framework
const express = require("express");
const app = express();

// ..2.. declare port no
require("dotenv").config();
const PORT = process.env.PORT || 3000

// // ..3.. middleware import
app.use(express.json());

// //..4.. route declare and mounting
const blog_routes = require("./routes/blogroutes");
app.use("/api/v2",blog_routes);

// // ..5..connect with db
const dbconnect = require("./config/database")
dbconnect();

// // ..6.. start port 
app.listen(PORT,()=>{
    console.log(`App started at port no ${PORT}`);
}
)
app.get("/",(req,res)=>{
    res.send(`<h1>This is HOMEPAGE baby</h1>`)
})
