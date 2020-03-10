import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Profiles from '../app/models/Profiles';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import Order from '../app/models/Order';
import Product from '../app/models/Product';

const models = [User, Profiles, Recipients, File, Delivery, Order, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
