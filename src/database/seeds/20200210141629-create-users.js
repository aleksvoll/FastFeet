const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Distribuidora FastFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          profile_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Vendedor de banana',
          email: 'vendedor@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          profile_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { Sequelize }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
