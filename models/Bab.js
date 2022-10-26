function createModelBab(Sequelize, DataTypes){
    const Bab = Sequelize.define('Bab', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        judul_bab: {
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

    Bab.associate = (models) => {
        Bab.belongsTo(models.Materi, {
            foreignKey: 'id_materi',
            as: 'materi',
        });
        Bab.hasMany(models.Artikel, {
            foreignKey: 'id_bab',
            as: 'artikel',
        });
    };

    return Bab;
}

module.exports = createModelBab;