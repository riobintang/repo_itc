function createModelArtikel(Sequelize, DataTypes){
    const Artikel = Sequelize.define('Artikel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        judul_artikel: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        isi: {
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
        id_bab: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bab',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    });

    Artikel.associate = (models) => {
        Artikel.belongsTo(models.Bab, {
            foreignKey: 'id_bab',
            as: 'bab',
        });
    };

    return Artikel;
}

module.exports = createModelArtikel;