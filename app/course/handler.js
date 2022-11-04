const { Course } = require("../../models");
const { validateCoursePhotoSchema } = require("../../validator/course");
const upload = require("../../utils/multer");
const cloudinary = require("../../utils/cloudinary").v2;

module.exports = {
  //handler get course
  handlerGetCourse: async (req, res, next) => {
    try {
      const courses = await Course.findAll();
      res.status(200).json({
        status: "success",
        message: "Successfully get all courses",
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler to post course
  handlerPostCourse: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      validateCoursePhotoSchema(req.file);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "itc-repo/course/",
      });
      const course = await Course.create({
        title: title,
        description: description,
        image_thumbnail: result.secure_url,
        cloudinary_id: result.public_id,
        id_division: req.user.id_division,
        id_user: req.user.id,
      });

      res.status(200).json({
        status: "success",
        message: "Successfully create course",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler to update course
  handlerPutCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, image_thumbnail, id_user } = req.body;
      const course = await Course.findByPk(id);
      if (!course) {
        throw new Error("Course not found");
      }
      await course.update({
        title: title,
        description: description,
        image_thumbnail: image_thumbnail,
        id_user: id_user,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully update course",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for delete course
  handlerDeleteCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) {
        throw new Error("Course not found");
      }
      await course.destroy();
      res.status(200).json({
        status: "success",
        message: "Successfully delete course",
      });
    } catch (error) {
      next(error);
    }
  },
};
