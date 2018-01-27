module.exports = function (sequelize, DataTypes) {
    var Crawls = sequelize.define("Crawls", {
        // places_id: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // crawler_id: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    });
    Crawls.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Crawls.belongsTo(models.Crawler, {
            onDelete: "cascade"
        });
        Crawls.belongsToMany(models.Places, {
            through: { model: models.PlacesToCrawlsJoin, unique: false},
            onDelete: "cascade"
        })
    };
    return Crawls;
};