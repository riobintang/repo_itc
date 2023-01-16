"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("courses", [
      {
        
        title: "Javascript Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667643077/itc-repo/course/qvb6qhhlvyo1x69fox16.jpg",
        cloudinary_id: "qvb6qhhlvyo1x69fox16",
        id_division: 2,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "Python Dasar",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667634116/itc-repo/course/b2zkflzfmac6bjiq9aqd.jpg",
        cloudinary_id: "b2zkflzfmac6bjiq9aqd",
        id_division: 2,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "Dart Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667643077/itc-repo/course/qvb6qhhlvyo1x69fox16.jpg",
        cloudinary_id: "qvb6qhhlvyo1x69fox16",
        id_division: 3,
        id_user: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "Figma From Scratch",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667634116/itc-repo/course/b2zkflzfmac6bjiq9aqd.jpg",
        cloudinary_id: "b2zkflzfmac6bjiq9aqd",
        id_division: 4,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "SQL Dasar",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667643077/itc-repo/course/qvb6qhhlvyo1x69fox16.jpg",
        cloudinary_id: "qvb6qhhlvyo1x69fox16",
        id_division: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "Pengenalan Flutter",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667634116/itc-repo/course/b2zkflzfmac6bjiq9aqd.jpg",
        cloudinary_id: "b2zkflzfmac6bjiq9aqd",
        id_division: 3,
        id_user: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "Pengenalan UX",
        description:
          "Course ini akan mengajarkan kalian dasar-dasar javascript",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667643077/itc-repo/course/qvb6qhhlvyo1x69fox16.jpg",
        cloudinary_id: "qvb6qhhlvyo1x69fox16",
        id_division: 5,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        title: "React JS for Front End",
        description: "Course ini akan mengajarkan kalian dasar-dasar python",
        image_thumbnail:
          "https://res.cloudinary.com/dd6stok7k/image/upload/v1667634116/itc-repo/course/b2zkflzfmac6bjiq9aqd.jpg",
        cloudinary_id: "b2zkflzfmac6bjiq9aqd",
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