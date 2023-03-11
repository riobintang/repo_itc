const { Course } = require("../models");

module.exports = {
  updateDateCourse: async (id_course) => {
    try {
      const course = await Course.findByPk(id_course);
      
      if (!course) {
        throw new Error("Course not found");
      }
      
      await course.changed("updatedAt",true);
      await course.update({updatedAt: new Date()})
      
      return course;
    } catch (error) {
      throw new Error(error);
    }
  },
};
