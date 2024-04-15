// to connect with adatbase momgoose is require
const mongoose = require("mongoose");

require("dotenv").config();
// load config from env file. to use process object we have to use this library


// used to establish connection
// process.env.DATABASE_URL --> instead this we can also write our whole url
const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        // useUndifinedTopology: true,
        // useCreateIndex: true,
    })
        //   url which is in .env fileis in process object because it is feed in process object using dotenv library
        .then(() => console.log("Connection of db is successfull"))
        .catch((error) => {
            console.log("issue in db connection");
            console.error(error.message);
            process.exit(1);
        });
}

module.exports = dbconnect;
// export the given function
