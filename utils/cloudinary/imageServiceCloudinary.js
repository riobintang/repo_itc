const cloudinary = require("./index").v2;
const path = require("path");

async function uploadImage(image, location, public_id = "") {
    const result = await cloudinary.uploader.upload(image, {
      folder: `itc-repo/${location}`,
      use_filename: false,
      unique_filename: false,
      public_id,
    });
    return result;

}

async function deleteImage(location, cloudinary_id) {
    console.log(`/itc-repo/${location}/${cloudinary_id}`)
    const result = await cloudinary.uploader.destroy(`itc-repo/${location}/${cloudinary_id}`);
    console.log(result)
    if (result.result != "ok") {
      throw new Error("Failed to delete image");
    }
    return result;
}

module.exports = {uploadImage, deleteImage};
