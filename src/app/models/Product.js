import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        brand: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'updated_by',
      as: 'updatedBy',
    });
    this.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'sender',
    });
  }
}

export default Product;
