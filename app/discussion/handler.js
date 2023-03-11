const {
  validateCreateDiscussionSchema,
  validateDiscussionImageSchema,
} = require("../../validator/discussion");

const discussionsServices = require("../../services/mysql/discussionService");
const usersServices = require("../../services/mysql/userService");
const {
  uploadImage,
  deleteImageWithLink,
} = require("../../utils/cloudinary/imageServiceCloudinary");

module.exports = {
  // handler post for discussion
  handlerPostDiscussion: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { title, body } = req.body;
      const { id_course } = req.params;
      validateCreateDiscussionSchema({ title, body });
      const discussion = await discussionsServices.create(
        { title, body },
        id_course,
        id_user
      );

      res.status(201).json({
        status: "success",
        message: "Successfully post Discussion",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler get all discussion by id course
  handlerGetDiscussionByIdCourse: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const discussions = await discussionsServices.getDiscussionByIdCourse(
        id_course
      );
      res.status(200).json({
        status: "success",
        message: "Successfully get Discussion by Course",
        data: discussions,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler get all discussion by id
  handlerGetDiscussionById: async (req, res, next) => {
    try {
      const { id_discussion } = req.params;
      const discussion = await discussionsServices.getDiscussionById(
        id_discussion
      );
      res.status(200).json({
        status: "success",
        message: "Successfully get Discussion by id",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler update discussion
  handlerPutDiscussion: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { id_course, id_discussion } = req.params;
      const { title, body } = req.body;
      validateCreateDiscussionSchema({ title, body });
      await discussionsServices.update({
        id_discussion,
        id_course,
        title,
        body,
        id_user,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully update Discussion",
      });
    } catch (error) {
      next(error);
    }
  },
  // handler delete discussion
  handlerDeleteDiscussion: async (req, res, next) => {
    try {
      const { id_discussion } = req.params;
      const userData = await usersServices.getUserById(req.user.id);
      await discussionsServices.delete({
        id_discussion,
        userid: userData.id,
        role: userData.role,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully delete Discussion",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetSearchDiscusssion: async (req, res, next) => {
    try {
      const { keyword } = req.query;
      const { id_course } = req.params;
      const discussion = await discussionsServices.searchDiscussion(
        id_course,
        keyword
      );
      res.status(200).json({
        status: "success",
        message: "Successfully get Discussion by Course",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostImageDiscussion: async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("Image is required");
      }
      validateDiscussionImageSchema(req.file);
      const result = await uploadImage(
        req.file.path,
        (location = "discussion")
      );
      res.status(200).json({
        location: result.secure_url,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteImageDiscussion: async (req, res, next) => {
    try {
      const { location } = req.body;
      await deleteImageWithLink(location);
      res.status(201).json({
        status: "success",
        message: "Successfully delete Image Discussion",
      });
    } catch (error) {
      next(error);
    }
  },
};
