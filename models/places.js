module.exports = function (sequelize, DataTypes) {
    var Places = sequelize.define("Places", {
        googlePlaceID : DataTypes.INTEGER,
        placesName: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        places_address: {
            type: DataTypes.STRING
        }

    });
    Places.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Places.belongsToMany(models.Crawls, {
            through: {model: models.PlacesToCrawlsJoin, unique: false},
            onDelete: "cascade"
        });
    };
    return Places;
};