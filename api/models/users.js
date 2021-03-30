module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },

      createdAt:{
          type:Sequelize.DATE
      },
      updatedAt:{
        type:Sequelize.DATE
      }

    });

    return User;
  };
