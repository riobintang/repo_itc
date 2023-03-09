const { Course } = require("../models");

module.exports = {
  updateDateCourse: async (id_course, t) => {
    try {
      const course = await Course.findByPk(id_course);
      
      if (!course) {
        throw new Error("Course not found");
      }
      // course.changed('updatedAt', true);
      
      await course.changed("updatedAt",true);
      await course.update({updatedAt: new Date()})
      console.log(`update at ${course.updatedAt}`);
      return course;
    } catch (error) {
      throw new Error(error);
    }
  },
};
