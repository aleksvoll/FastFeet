import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Profiles extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Profiles;
