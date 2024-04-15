const mongoose = require("mongoose");
const nodemailer = require("nodemailer") // it will give mail after uploadetion of file

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imgUrl: {
        type: String

    },
    tags: {
        type: String

    },
    email: {

        type: String

    }

})

fileSchema.post("save", async function(doc){
try{
    console.log("DOC", doc);

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587, // Or the appropriate port for your email provider
        secure: false, // Set to true if using SSL/TLS
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
        debug:true
    });
    
    if (doc.email) {
        transporter.sendMail({
            from: 'Palak',
            to: doc.email,
            subject: 'Test Email',
            html: `<h1>Hello</h1> <p>This is a test email from Nodemailer.</p> <p>File is uploaded view here: <a href="${doc.imgUrl}">${doc.imgUrl}</a></p>`
        },
        
        (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        console.log(doc.to);
        
    } else {
        console.error('Email address not found in document:', doc);
    }
    
}catch(error){

    console.error(error);
}
})

module.exports = mongoose.model("File", fileSchema);
