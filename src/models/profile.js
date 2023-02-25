import Sequelize, { Model } from "sequelize";

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        gender: Sequelize.STRING,
        mobile: Sequelize.STRING,
        dob: Sequelize.DATE,
        photo: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: "UserProfile",
      foreignKey: "profileId",
    });
  }
}

export default Profile;
