"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("courses", [
      {
        id: 1,
        title: "Javascript Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667643077/itc-repo/course/qvb6qhhlvyo1x69fox16.jpg",
        cloudinary_id: "qvb6qhhlvyo1x69fox16",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Python Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667634116/itc-repo/course/b2zkflzfmac6bjiq9aqd.jpg",
        cloudinary_id: "b2zkflzfmac6bjiq9aqd",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("courses", null, [{}]);
  },
};
