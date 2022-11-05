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
      const checkImageSize = await upload(req.file.path);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "itc-repo/course/",
      });
      const course = await Course.create({
        title: title,
        description: description,
        image_thumbnail: result.secure_url,
        cloudinary_id: result.public_id.split("/")[2],
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
      const { title, description } = req.body;

      const course = await Course.findByPk(id);
      if (!course) {
        throw new Error("Course not found");
      }

      if (req.file !== null) { //update image
        validateCoursePhotoSchema(req.file);
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder:"itc-repo/course/", public_id: course.cloudinary_id,
        });
        await course.update({
          image_thumbnail: result.secure_url,
          cloudinary_id: course.cloudinary_id,
        });
      }
      await course.update({
        title: title,
        description: description,
        id_user: req.user.id,
      });
      await course.save();

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
      const deleteImagePublic_id =  `itc-repo/course/${course.cloudinary_id}`;
      const result = await cloudinary.uploader.destroy(deleteImagePublic_id);
      console.log(result);
      if (result.result !== "ok") {
        throw new Error("Failed to delete image");
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
