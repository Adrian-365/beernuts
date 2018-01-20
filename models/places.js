module.exports = function (sequelize, DataTypes) {
    var Places = sequelize.define("Places", {
        placeId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Places.belongsTo(models.Places,
                        {
                            onDelete: 'cascade',
                            foreignKey: {
                                allowNull: false
                            }
                        });
                }
            }
        });
    return Places;
};