const { Course } = require("../../models");
const {
  validateCoursePhotoSchema,
  validateCourseCreateUpdateSchema,
} = require("../../validator/course");
const cloudinary = require("../../utils/cloudinary").v2;
const Sequelize = require("sequelize");
const { deleteImage } = require("../../utils/cloudinary/imageServiceCloudinary");;
const Op = Sequelize.Op;
module.exports = {
  //handler get course
  handlerGetAllCourse: async (req, res, next) => {
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
  //handler get course by id
  handlerGetCourseById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);

      if (!course) {
        throw new Error("Course not found");
      }

    res.status(200).json({
      status: 'success',
      message: 'Successfully get course',
      data: course,
    });
    } catch (error) {
      next(error);
    }
  },
  //handler search courses by title
  handlerGetCourseByTitle: async (req, res, next) => {
    try {
      const { title } = req.params;
      const courses = await Course.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get courses by title",
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler Get Course with Pagination
  handlerGetCourseByPage: async (req, res, next) => {
    try {
      const { page } = req.params;
      const courses = await Course.findAll({
        limit: 10,
        offset: (page - 1) * 10,
      });
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
      const { title, description, id_division } = req.body;

      validateCoursePhotoSchema(req.file); // validate photo extension
      validateCourseCreateUpdateSchema({ title, description, id_division }); // validate title and description

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "itc-repo/course/",
        use_filename: true,
        unique_filename: true,
      });
      const course = await Course.create({
        title: title,
        description: description,
        image_thumbnail: result.secure_url,
        cloudinary_id: result.public_id.split("/")[2],
        id_division: id_division,
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
      const { title, description, id_division } = req.body;

      const course = await Course.findByPk(id); // search course by id
      if (!course) {
        throw new Error("Course not found");
      }

      validateCourseCreateUpdateSchema({ title, description, id_division }); // validate title and description

      if (req.file != null) {
        //update image
        validateCoursePhotoSchema(req.file); //validate image
        const result = await cloudinary.uploader.upload(req.file.path, {
          // upload image to cloudinary
          folder: "itc-repo/course/",
          public_id: course.cloudinary_id,
        });
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
      // const deleteImagePublic_id = `itc-repo/course/${course.cloudinary_id}`; // to save public_id for parameter destroy
      // const result = await cloudinary.uploader.destroy(deleteImagePublic_id); // delete image in cloudinary
      // if (result.result !== "ok") {
      //   throw new Error("Failed to delete image");
      // }
      const result = await deleteImage("course", course.cloudinary_id);
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
