module.exports = function (sequelize, DataTypes) {
    var Places_To_Crawls_Join = sequelize.define("PlacesToCrawlsJoin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    
    return Places_To_Crawls_Join;
};