const cloudinary = require("./index").v2;
const path = require("path");

async function uploadImage(image, location) {
    const result = await cloudinary.uploader.upload(image, {
      folder: `itc-repo/${location}`,
      use_filename: false,
      unique_filename: false,
    });
    return result;

}

async function deleteImage(cloudinary_id) {
    console.log(cloudinary_id)
    const result = await cloudinary.uploader.destroy(cloudinary_id);
    console.log(result)
    if (result.result != "ok") {
      throw new Error("Failed to delete image");
    }
    return result;
}

module.exports = {uploadImage, deleteImage};
