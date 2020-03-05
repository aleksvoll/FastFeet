module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('delivery', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'files',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('delivery');
  },
};
