function createModelMateri(Sequelize, DataTypes){
    const Materi = Sequelize.define('Materi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        judul_materi: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        image_thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        id_divisi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'divisi',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }, 
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }, 
    });

    Materi.associate = (models) => {
        Materi.belongsTo(models.Divisi, {
            foreignKey: 'id_divisi',
            as: 'divisi',
        });
        Materi.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user',
        });
        Materi.hasMany(models.Bab, {
            foreignKey: 'id_materi',
            as: 'bab',
        });
    };

    return Materi;
}

module.exports = createModelMateri;