const cloudinary = require("./index").v2;
const path = require("path");

async function uploadImage(image, location) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: `itc-repo/${location}`,
      use_filename: false,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = uploadImage;
