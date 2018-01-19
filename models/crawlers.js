module.exports = function (sequelize, DataTypes) {
    var Crawler = sequelize.define("Crawler", {
        // Giving the Crawler model a name of type STRING
        name: DataTypes.STRING,
        email: DataTypes.STRING
    });

    // Crawler.associate = function (models) {
    //     // Associating Crawler with Crawls
    //     // When an Crawler is deleted, also delete any associated Crawls
    //     Crawler.hasMany(models.Post, {
    //         onDelete: "cascade"
    //     });
    // };

    return Crawler;
};