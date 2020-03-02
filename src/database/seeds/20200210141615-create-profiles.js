module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'profiles',
      [
        {
          description: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('profiles', null, {});
  },
};
