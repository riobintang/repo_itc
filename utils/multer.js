const multer = require("multer");
const path = require("path");
const supportType = [".jpg", ".jpeg", ".png"];
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 15000 }, // max size is 5 megabyte
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (!supportType.includes(ext)) {
      cb(new Error("Unsupported file type"), false);
      return;
    }
    cb(null, true);
  },
});
