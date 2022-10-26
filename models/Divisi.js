function createModelDivisi(Sequelize, DataTypes){
    const Divisi = Sequelize.define('Divisi', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        nama_divisi: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
        }, 
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          }, 
    });

    Divisi.associate = (models) => {
        Divisi.hasMany(models.User, {
            foreignKey: 'id_divisi',
            as: 'user',
        });
        Divisi.hasMany(models.Materi, {
            foreignKey: 'id_divisi',
            as: 'materi',
        });
    };

    return Divisi;
}

module.exports = createModelDivisi;