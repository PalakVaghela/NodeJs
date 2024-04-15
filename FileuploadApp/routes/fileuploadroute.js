const express = require("express");
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imgSizeReducer} = require("../controller/fileuploadcontroller");

router.post("/localFileUpload",localFileUpload);
router.post("/imgUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imgSizeReducer",imgSizeReducer);

module.exports = router;