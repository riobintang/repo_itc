const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, next) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" || ext !== ".jpeg" || ext !== ".png") {
            next(new Error("Unsupported file type!"));
            return;
        }   
    },
})