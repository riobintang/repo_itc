const multer = require("multer");
const path = require("path");
const supportType = [".jpg", "jpeg", ".png"];
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (!supportType.includes(ext)) {
      cb(new Error("Unsupported file type"), false);
      return;
    }
    cb(null, true);
  },
});
