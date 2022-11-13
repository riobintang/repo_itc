function applyExtraSetup(sequelize) {
    const { User, Role, Division, Course, Chapter, Article, Discussion } = sequelize.models;

    Role.hasMany(User, {
        foreignKey: 'id_role',
        sourceKey: 'id',
    });
    User.belongsTo(Role, {
        foreignKey: 'id_role',
        targetKey: 'id'
    });

    Division.hasMany(User, {
        foreignKey: 'id_division',
        sourceKey: 'id',
    });
    User.belongsTo(Division, {
        foreignKey: "id_division",
        targetKey: 'id'
    });

    User.hasMany(Course, {
        foreignKey: "id_user",
        sourceKey: 'id',
    });
    Course.belongsTo(User, {
        foreignKey: "id_user",
        targetKey: 'id'
    });

    Division.hasMany(Course, {
        foreignKey: "id_division",
        sourceKey: 'id',
    });
    Course.belongsTo(Division, {
        foreignKey: "id_division",
        targetKey: 'id'
    });
    
    Course.hasMany(Chapter, {
        foreignKey: "id_course",
        sourceKey: 'id',
    });
    Chapter.belongsTo(Course, {
        foreignKey: "id_course",
        targetKey: 'id'
    });

    Chapter.hasMany(Article, {
        foreignKey: "id_chapter",
        sourceKey: 'id',
    });
    Article.belongsTo(Chapter, {
        foreignKey: "id_chapter",
        targetKey: 'id'
    });

    User.hasMany(Discussion, {
        foreignKey: "id_user",
        sourceKey: 'id',
    });
    Discussion.belongsTo(User, {
        foreignKey: "id_user",
        targetKey: 'id'
    });

    Course.hasMany(Discussion, {
        foreignKey: "id_course",
        sourceKey: 'id',
    });
    Discussion.belongsTo(Course, {
        foreignKey: "id_course",
        targetKey: 'id'
    });

    Discussion.hasMany(Comment, {
        foreignKey: "id_discussion",
        sourceKey: 'id',
    });
    Comment.belongsTo(Discussion, {
        foreignKey: "id_discussion",
        targetKey: 'id'
    });

    User.hasMany(Comment, {
        foreignKey: "id_user",
        sourceKey: 'id',
    });
    Comment.belongsTo(User, {
        foreignKey: "id_user",
        targetKey: 'id'
    });

    User.hasMany(Token, {
        foreignKey: "id_user",
        sourceKey: 'id',
    });
    Token.belongsTo(User, {
        foreignKey: "id_user",
        targetKey: 'id'
    });
}

module.exports = {applyExtraSetup};