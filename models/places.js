module.exports = function (sequelize, DataTypes) {
    var Places = sequelize.define("Places", {
        places_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        places_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        places_address: {
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