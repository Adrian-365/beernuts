module.exports = function (sequelize, DataTypes) {
    var Crawler = sequelize.define("Crawler", {
        // Giving the Crawler model a name of type STRING
        email: { 
            type: DataTypes.STRING,
            unique: true,
            require: true,
            validate: {
                isEmail: true
            }

        },
        city: DataTypes.STRING,
        state: DataTypes.STRING(2),
        zip: DataTypes.STRING(5),
        blurb: DataTypes.STRING,
        salt: {
            type: DataTypes.STRING,
            require: true
        },
        hash: {
            type: DataTypes.STRING(1500), 
            require: true 
        }
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