const { Course } = require("../models");

module.exports = {
  updateDateCourse: async (id_course) => {
    try {
      const course = await Course.findByPk(id_course);
      
      if (!course) {
        throw new Error("Course not found");
      }
      course.changed('updatedAt', true);
      await course.save();
    } catch (error) {
      throw new Error(error);
    }
  },
};
