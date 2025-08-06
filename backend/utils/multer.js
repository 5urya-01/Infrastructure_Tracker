const multer = require('multer');
const crypto = require('crypto');
// const fuin = require('../public/images/BuildingImages')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/BuildingImages"); 
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err);
            const uniqueName = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, uniqueName);
        });
        // cb(null,file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const fileType = /jpg|jpeg|png/;
    const isValidType = fileType.test(path.extname(file.originalname).toLowerCase());
    if (isValidType) {
        cb(null,true)
    } else {
        cb(new Error("File type not supported"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('buildingImage');

module.exports = upload;
