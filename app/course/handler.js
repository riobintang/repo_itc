const {
  validateCoursePhotoSchema,
  validateCourseCreateUpdateSchema,
} = require("../../validator/course");

const coursesServices = require("../../services/mysql/courseService");

module.exports = {
  //handler get course
  handlerGetAllCourse: async (req, res, next) => {
    try {
      const { title } = req.query;
      const courses = await coursesServices.getAllCourses(title);
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
      const course = await coursesServices.getCourseById(id);

      res.status(200).json({
        status: "success",
        message: "Successfully get course",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler search courses by title
  // handlerGetCourseByTitle: async (req, res, next) => {
  //   try {
  //     const { title } = req.query;
  //     const courses = await coursesServices.searchByTitle(title);
  //     res.status(200).json({
  //       status: "success",
  //       message: "Successfully get courses by title",
  //       data: courses,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  //handler Get Course with Pagination
  handlerGetCourseForMobile: async (req, res, next) => {
    try {
      const { title } = req.query;
      const page = req.query.page || 1;
      const courses = await coursesServices.getCourseForMobile(title, page);
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
      if (!req.file) {
        throw new Error("Image is required");
      }
      validateCoursePhotoSchema(req.file); // validate photo extension
      validateCourseCreateUpdateSchema({ title, description, id_division }); // validate title and description

      const course = await coursesServices.create({
        image: req.file.path,
        title,
        description,
        id_division,
        userid: req.user.id,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully create course",
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
      if (req.file) {
        validateCoursePhotoSchema(req.file); // validate photo extension
      }
      validateCourseCreateUpdateSchema({ title, description, id_division }); // validate title and description

      const course = await coursesServices.update({
        id,
        title,
        description,
        id_division,
        image: req.file.path || null,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully update course",
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for delete course
  handlerDeleteCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      await coursesServices.delete(id);

      res.status(200).json({
        status: "success",
        message: "Successfully delete course",
      });
    } catch (error) {
      next(error);
    }
  },
};
