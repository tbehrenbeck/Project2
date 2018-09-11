var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    // Basic info (name, email, password)
    fullName: {
      type: DataTypes.STRING,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
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
      type: DataTypes.STRING,
      allowNull: false
    },

    // Profile
    // Goal (INTEGER: 0, 1, 2 - predefined goals user will select)
    goal: {
      type: DataTypes.INTEGER
    },

    gender: {
      type: DataTypes.STRING
    },

    age: {
      type: DataTypes.INTEGER
    },

    weight: {
      type: DataTypes.INTEGER
    },

    height: {
      type: DataTypes.INTEGER
    },

    // User selects predefined options (0-4)
    activityLevel: {
      type: DataTypes.INTEGER
    },

    mealCount: {
      type: DataTypes.INTEGER,
    },

    recCals: {
      type: DataTypes.INTEGER
    },

    protein: {
      type: DataTypes.INTEGER
    },

    carbs: {
      type: DataTypes.INTEGER
    },

    fats: {
      type: DataTypes.INTEGER
    },

    profilePic: {
      type: DataTypes.STRING,
      defaultValue: "http://advaion.com/wp-content/uploads/2017/11/placeholder.png"
    }

  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
