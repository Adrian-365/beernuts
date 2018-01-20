module.exports = function(sequelize, DataTypes) {
    var Crawl = sequelize.define("Post", {
        placeId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Crawl.belongsTo(models.Crawlers,
                {
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Crawl;
};