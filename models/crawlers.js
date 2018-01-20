module.exports = function (sequelize, DataTypes) {
    var Crawler = sequelize.define("Crawler", {
        // Giving the Crawler model a name of type STRING
        username: DataTypes.STRING,
        user_email: DataTypes.STRING,
        user_city: DataTypes.STRING,
        user_state: DataTypes.STRING(2),
        user_zip: DataTypes.STRING(5),
        user_blurb: DataTypes.STRING,
        user_password: DataTypes.STRING
    },
    {
        classMethods: {
            associate: function(models){
                Crawler.hasmany(models.Crawls);
            }
        }
    
    });

    return Crawler;
};