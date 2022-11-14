const { Course } = require("../models");

module.exports = {
  updateDateCourse: async (id_course) => {
    try {
        console.log(id_course);
      const course = await Course.findByPk(id_course);
      
      if (!course) {
        throw new Error("Course not found");
      }
      await course.update({
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
