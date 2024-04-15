const bcrypt = require("bcrypt");
const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    // check if user already exists or not
    const userexist = await usermodel.findOne({ email });

    if (userexist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // secure password
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
      // we want to hash the password in 10 rounds, as bcrypt's encryption works on rounds
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // create or sign in user
    const createUser = await usermodel.create({
      name,
      email,
      role,
      password: hashpassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot register, please try again later",
    });
  }
};

// exports.login = async (req, res) => {
//   try {
//     // fetch data 
//     const {email,password} = req.body;
//     if (!email||!password) {
//       res.status(400).json({
//         success: false,
//         message: "Please enter valid input"
//       })
//     }

//     const User = await usermodel.findOne({email});
//     if (!User) {
//       return res.status(401).json({
//         success: false,
//         message: "User not registered"
//       })
//     }

//     // check if password is correct or not
//     // Data is sent in terms of packets and individual packets contain a header and the data which is sent by the sender this data is called Payload. 
//     let payload = {
//       email: User.email,
//       id: User._id,
//       role: User.role
//     }
    
//     User.token = token;
//     User.password = undefined;
//     const Option = {
//       expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//       httpOnly: true
//     }

//     if (await bcrypt.compare(password, User.password)) {
//       // condition if pw is correct
//       let token = jwt.sign(payload, process.env.JWT_secret, {
//         expiresIn: "2h"
//       })
//       // here we want to convert it into user's token but it's password will be visible to server in db so we declare password as undefined for token only not in database


//       // pass cookie in responce
//       // cookie(name_of_cookie, data, other options)

//       res.cookie("token", token, Option).status(405).json({
//         success: true,
//         User,
//         token,
//         message: "User created successfully"
//       })

//     }
//     else {
//       res.cookie("token", token, Option).status(403).json({
//         success: false,
//         message: "Please enter valid password"

//       });

//     } 
//   }
//    catch(error) {
//     res.status(403).json({
//       success:false,
//       message:"Error during login process"
//     });
    
//   }
// }


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid input"
      });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered"
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        email: user.email,
        id: user._id,
        role: user.role
      };

      let token = jwt.sign(payload, process.env.JWT_secret, {
        expiresIn: "2h"
      });

      user.token = token;
      user.password = undefined;

      const option = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      res.cookie("token", token, option).status(200).json({
        success: true,
        user,
        token,
        message: "User logged in successfully"
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Please enter valid password"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during login process"
    });
  }
};

