const { Course } = require("../../models");

module.exports = {
    updateDateCourse: async (req, res, id_course) => {
         try {
            const course = await Course.findByPK(id_course);
            await course.update({
                updatedAt: new Date(),
            });
         } catch(error){
            throw new Error(error);
         }
    }
}