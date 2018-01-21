module.exports = function(sequelize, DataTypes) {
    var Crawls = sequelize.define("Crawls", {
        placeId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Crawls.belongsTo(models.Crawler,
                {
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Crawls;
};