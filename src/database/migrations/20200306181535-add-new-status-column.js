module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('delivery', 'status');
  },
};
