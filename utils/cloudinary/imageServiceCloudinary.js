const cloudinary = require("./index").v2;

async function uploadImage(image, location, public_id = "") {
    const result = await cloudinary.uploader.upload(image, {
      folder: `itc-repo/${location}`,
      use_filename: false,
      unique_filename: false,
      public_id,
      eager: location === "course" ? [
        { width: 600,
          quality: "auto:low",
          fetch_format: "auto",
        },
      ] : null,
    });
    return result;
}

async function deleteImage(location, cloudinary_id) {
    const result = await cloudinary.uploader.destroy(`itc-repo/${location}/${cloudinary_id}`);
    // if (result.result != "ok") {
    //   throw new Error("Failed to delete image");
    // }
    return result;
}

async function deleteImageWithLink(link) {
  const result = await cloudinary.uploader.destroy(link);
  return result;
}

module.exports = {uploadImage, deleteImage, deleteImageWithLink};
