function createModelKomentar(Sequelize, DataTypes){
    const Komentar = Sequelize.define('Komentar', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        isi_komentar: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        isEdited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }, 
        cretaedAt: {
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
        id_diskusi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'diskusi',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }, 
    });

    Komentar.associate = (models) => {
        Komentar.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user',
        });
        Komentar.belongsTo(models.Diskusi, {
            foreignKey: 'id_diskusi',
            as: 'diskusi',
        });
    };

    return Komentar;
}

module.exports = createModelKomentar;