// mongoose is always require for database
const mongoose = require("mongoose");

// to access env include it
require("dotenv").config();

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        // useCreateIndex: true,
    })
        //   url which is in .env fileis in process object because it is feed in process object using dotenv library
        .then(() => console.log("Connection of db is sucessful"))
        .catch((error) => {
            console.log("issue in db connection");
            console.error(error.message);
            process.exit(1);
        });
}

module.exports=dbconnect;