module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled"
    },
    url: {
      type: DataTypes.STRING,
    },
    pic: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.INTEGER
    },
    calories: {
      type: DataTypes.INTEGER
    },
    fats: {
      type: DataTypes.INTEGER
    },
    protein: {
      type: DataTypes.INTEGER
    },
    carbs: {
      type: DataTypes.INTEGER
    },
    serves: {
      type: DataTypes.INTEGER
    }
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorite;
};