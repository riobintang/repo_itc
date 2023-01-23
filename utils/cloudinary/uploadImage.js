const cloudinary = require("./index").v2;
const path = require("path");
const directoryPath = path.join(__dirname, "../../public/images/");

async function uploadImageTesting(location) {
  const image = directoryPath + "shutterstock_515285995-1200x580_bkah0q.jpg";
  const result = await cloudinary.uploader.upload(image, {
    folder: `itc-repo/${location}/`,
    use_filename: false,
    unique_filename: false,
  });
  return result;
}
module.exports = uploadImageTesting;
