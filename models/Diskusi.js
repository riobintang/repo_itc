function createModelDiskusi(Sequelize, DataTypes){
    const Diskusi = Sequelize.define('Diskusi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        judul_pertanyaan: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        isi_pertanyaan: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        isEdited: {
            type: DataTypes.BOOLEAN,
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
        id_materi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'materi',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }, 
    });

    Diskusi.associate = (models) => {
        Diskusi.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user',
        });
        Diskusi.belongsTo(models.Materi, {
            foreignKey: 'id_materi',
            as: 'materi',
        });
        Diskusi.hasMany(models.Komentar, {
            foreignKey: 'id_diskusi',
            as: 'komentar',
        });
    };

    return Diskusi;
}

module.exports = createModelDiskusi;