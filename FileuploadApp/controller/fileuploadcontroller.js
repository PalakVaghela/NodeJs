const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const path = require('path');

// use clodinary upload documentation to decide which function will be used

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file; 
        console.log("We got a file : ", file);

        // path in server here __dirname show current dir + folder name in controller + give unique no that is date + using this only can see the file else content is not visible 
        let filepath = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`

        // Construct file path
        // let filepath = path.join(__dirname, "/files/", Date.now() + `.${file.name.split(".")[1]}`);
        console.log("Path:", filepath);
        console.log(filepath)

        // add path to move function
        // file.mv(path, (err) => {
        //     console.log(err);
        // })

        file.mv(filepath, (err) => {
            if (err) {
                console.error("Error moving file:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to move file"
                });
            }
            console.log("File moved successfully");
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Problem in image uploading"
        })
    }
}

async function uploadFiletoCloudinary(file,folder,quality) {
    const Options = { folder };
    Options.resource_type = "auto";

    if(quality){
        Options.quality = quality;
        // if quality is given then change img to given quality
    }
    // set the type of file you are uploading or use auto that will detect all types
    const filePath = file.tempFilePath; // Assuming 'tempFilePath' contains the file path
    await cloudinary.uploader.upload(filePath, Options);
    // data will move from your local device to tem file and then tem device to destination and the it will delete from temp file path
}


function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type);
}

// for image upload
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file2 = req.files.imgfile;
        // imgfile is destination where we want to upload and as same we have to give in postman data
        console.log("We got a file : ", file2);

        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file2.name.split(".")[1].toLowerCase();
        console.log(file2);

        // this is not inbuilt function it is created like... and we provide same return for both it compare both filetypes
        // function isFileTypeSupported(fileType, supportedTypes) {
        //     return supportedTypes.includes(fileType);
        // }

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.json({
                success: false,
                message: "File type is not supported"
            })
        }

        // upload file
        const response = uploadFiletoCloudinary(file2, "codehelp");
        console.log(response);

        const fileData = await File.create(
            {
                name,
                tags,
                email,
                imgUrl: response.secure_url
            }
        )

        res.status(200).json({
            success: true,
            imgUrl: response.secure_url,
            message: "Image uploaded successfully"
        })

    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Problem in image uploading"
        })
    }

}

// video handler
exports.videoUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        console.log(name, email, tags);
        console.log(req)

        const file3 = req.files.videoFile;
        console.log("File", file3);

        // validation
        const supportedType = ["mp4", "mov"];
        const fileType = file3.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType,supportedType)) {
            return res.json({
                success: false,
                message: "Error in uploading video."
            }) 
        }

        const response = uploadFiletoCloudinary(file3, "codehelp");
        console.log(response);

        const fileData = await File.create(
            {
                name,
                tags,
                email,
                imgUrl: response.secure_url
            }
        )

        res.status(200).json({
            success: true,
            imgUrl: response.secure_url,
            message: "Video uploaded successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong during video uploading"
        })

    }
}

// size reducer
exports.imgSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file2 = req.files.imgfile;
        // imgfile is destination where we want to upload and as same we have to give in postman data
        console.log("We got a file : ", file2);

        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file2.name.split(".")[1].toLowerCase();
        console.log(file2);

        // this is not inbuilt function it is created like... and we provide same return for both it compare both filetypes
        // function isFileTypeSupported(fileType, supportedTypes) {
        //     return supportedTypes.includes(fileType);
        // }

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.json({
                success: false,
                message: "File type is not supported"
            })
        }

        // upload file
        const response = uploadFiletoCloudinary(file2, "codehelp",20);
        console.log(response);

        const fileData = await File.create(
            {
                name,
                tags,
                email,
                imgUrl: response.secure_url
            }
        )

        res.status(200).json({
            success: true,
            imgUrl: response.secure_url,
            message: "Image uploaded successfully"
        })

    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Problem in image uploading"
        })
    }

}

