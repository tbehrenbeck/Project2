var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    // Basic login info (name, email, password)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },

    password: {
      type: DataTypes.STRING
    },

    // Profile
    // Goal (INTEGER: 0, 1, 2 - predefined goals user will select)
    goal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // User selects predefined options (0-4)
    activityLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    mealCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  // 
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
