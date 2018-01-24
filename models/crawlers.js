module.exports = function (sequelize, DataTypes) {
    var Crawler = sequelize.define("Crawler", {
        // Giving the Crawler model a name of type STRING
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING(2),
        zip: DataTypes.STRING(5),
        blurb: DataTypes.STRING,
        password: DataTypes.STRING
    });

     Crawler.associate = function (models) {
         // Associating Author with Posts
         // When an Author is deleted, also delete any associated Posts
         Crawler.hasMany(models.Crawls, {
             onDelete: "cascade"
         });
     };
    return Crawler;
};