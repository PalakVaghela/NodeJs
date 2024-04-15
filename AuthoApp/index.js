const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

// import cookie- parser
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 

app.use(express.json());


require("./config/database").connect();

const user1 = require("./routes/user");
// app.use() is used to mount middleware fun. at given path
app.use("/api/v1",user1);

app.listen(PORT, ()=>{
    console.log(`App is running at port no. ${PORT}`);

})