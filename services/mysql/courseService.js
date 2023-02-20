const Sequelize = require("sequelize");

const { Course, User, Division } = require("../../models");

const {
  uploadImage,
  deleteImage,
} = require("../../utils/cloudinary/imageServiceCloudinary");

const Op = Sequelize.Op;

async function getAllCourses(title = "") {
    const courses = await Course.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    attributes: {exclude: ["id_user"]},
    include: [{model: User, attributes: ["fullName"]}, {model: Division, attributes: ["divisionName"]}],
  });
  return courses;
}

async function getCourseById(id) {
  const course = await Course.findByPk(id, {
    attributes: {exclude: ["id_user"]},
    include: [{model: User, attributes: ["fullName"]}, {model: Division, attributes: ["divisionName"]}]
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
}

// async function searchByTitle(title= "") {
//   const courses = await Course.findAll({
//     where: {
//       title: {
//         [Op.like]: `%${title}%`,
//       },
//     },
//   });
//   return courses;
// }

async function getCourseForMobile(title = "", page = 1) {
  console.log("page = " + page)
  const courses = await Course.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  attributes: {exclude: ["id_user"]},
  include: [{model: User, attributes: ["fullName"]}, {model: Division, attributes: ["divisionName"]}],
  limit: 10,
  offset: (page - 1) * 10,
});
return courses;

}

async function postCourse(data) {
  const resultPostImageCourse = await uploadImage(data.image, "course");

  const createCourse = await Course.create({
    title: data.title,
    description: data.description,
    image_thumbnail: resultPostImageCourse.secure_url,
    cloudinary_id: resultPostImageCourse.public_id.split("/")[2],
    id_division: data.id_division,
    id_user: data.userid,
  });

  return createCourse;
}

async function updateCourse(data) {
  const updateCourse = await Course.findByPk(data.id); // search course by id
  if (!updateCourse) {
    throw new Error("Course not found");
  }
  if (data.image != null) {
    const result = await uploadImage(
      data.image,
      "course",
      updateCourse.cloudinary_id
    );
    await updateCourse.update({
      image_thumbnail: result.secure_url,
      cloudinary_id: updateCourse.cloudinary_id,
    });
  }
  await updateCourse.update({
    title: data.title,
    description: data.description,
    id_division: data.id_division,
  });

  return updateCourse;
}

async function deleteCourse(id) {
  const deleteCourse = await Course.findByPk(id);
  if (!deleteCourse) {
    throw new Error("Course not found");
  }

  await deleteImage("course", deleteCourse.cloudinary_id);
  await deleteCourse.destroy();

  return deleteCourse;
}

const coursesServices = {
  getAllCourses,
  getCourseById,
  getCourseForMobile,
  //searchByTitle,
  create: postCourse,
  update: updateCourse,
  delete: deleteCourse,
};

module.exports = coursesServices;
