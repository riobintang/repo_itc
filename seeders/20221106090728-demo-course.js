"use strict";

const uploadImageTesting = require("../utils/cloudinary/uploadImageTesting");
async function generateImage() {
  const data = [];
  for (let i = 0; i < 8; i++) {
    let upload = await uploadImageTesting("course");
    let image = {
      image_thumbnail: upload.secure_url,
      cloudinary_id: upload.public_id.split("/")[2],
    };
    data.push(image);
  }
  return data;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataImage = await generateImage();
    return queryInterface.bulkInsert("courses", [
      {
        title: "Javascript Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail: dataImage[0].image_thumbnail,
        cloudinary_id: dataImage[0].cloudinary_id,
        id_division: 2,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Python Dasar",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail: dataImage[1].image_thumbnail,
        cloudinary_id: dataImage[1].cloudinary_id,
        id_division: 2,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Dart Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail: dataImage[2].image_thumbnail,
        cloudinary_id: dataImage[2].cloudinary_id,
        id_division: 3,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Figma From Scratch",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail: dataImage[3].image_thumbnail,
        cloudinary_id: dataImage[3].cloudinary_id,
        id_division: 4,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "SQL Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail: dataImage[4].image_thumbnail,
        cloudinary_id: dataImage[4].cloudinary_id,
        id_division: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Pengenalan Flutter",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail: dataImage[5].image_thumbnail,
        cloudinary_id: dataImage[5].cloudinary_id,
        id_division: 3,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Pengenalan UX",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail: dataImage[6].image_thumbnail,
        cloudinary_id: dataImage[6].cloudinary_id,
        id_division: 5,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React JS for Front End",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail: dataImage[7].image_thumbnail,
        cloudinary_id: dataImage[7].cloudinary_id,
        id_division: 2,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("courses", null, [{}]);
  },
};
