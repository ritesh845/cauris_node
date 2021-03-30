module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("talents", {
      name: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      facebookLink: {
        type: Sequelize.STRING
      },
      snapchatLink: {
        type: Sequelize.STRING
      },
      instagramLink: {
        type: Sequelize.STRING
      },
      youtubeLink: {
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
