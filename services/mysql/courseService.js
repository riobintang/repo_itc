const Sequelize = require("sequelize");

const { Course } = require("../../models");
const cloudinary = require("../../utils/cloudinary").v2;
const {
  uploadImage,
  deleteImage,
} = require("../../utils/cloudinary/imageServiceCloudinary");

const Op = Sequelize.Op;

async function getAllCourses() {
  const courses = await Course.findAll();
  return courses;
}

async function getCourseById(id) {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
}

async function searchByTitle(title) {
  const courses = await Course.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });
  return courses;
}

async function getCourseByPage(page) {
  const courses = await Course.findAll({
    limit: 10,
    offset: (page - 1) * 10,
  });
  return courses;
}

async function postCourse(data) {
  const result = await uploadImage(data.image, "course");

  const course = await Course.create({
    title: data.title,
    description: data.description,
    image_thumbnail: result.secure_url,
    cloudinary_id: result.public_id.split("/")[2],
    id_division: data.id_division,
    id_user: data.userid,
  });

  return course;
}

async function updateCourse(data) {
  const course = await Course.findByPk(data.id); // search course by id
  if (!course) {
    throw new Error("Course not found");
  }
  if (data.image != null) {
    const result = await uploadImage(
      data.image,
      "course",
      course.cloudinary_id
    );
    await course.update({
      image_thumbnail: result.secure_url,
      cloudinary_id: course.cloudinary_id,
    });
  }
  await course.update({
    title: title,
    description: description,
    id_division: id_division,
  });
}

async function deleteCourse(id) {
  const course = await Course.findByPk(id);
  if (!course) {
    throw new Error("Course not found");
  }

  await deleteImage("course", course.cloudinary_id);
  await course.destroy();

  return course;
}

const coursesServices = {
    getAllCourses,
    getCourseById,
    getCourseByPage,
    searchByTitle,
    create: postCourse,
    update: updateCourse,
    delete: deleteCourse,
}

module.exports = coursesServices;
