const express = require("express");
const app = express();


// post no define
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// express-fileupload middleware

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// db connection
const db = require("./config/database");
db.connect();

// cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryconnect();

// mounted route
const upload = require("./routes/fileuploadroute");
app.use('/api/v1/upload', upload); // Added a forward slash before 'api/v1/upload'

// connection
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
