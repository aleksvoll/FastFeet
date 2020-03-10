module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'tenis',
          description: 'tenis de mola',
          brand: 'nike',
          seller_id: 2,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'meia',
          description: 'meia furada',
          brand: 'nike',
          seller_id: 2,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'canelera',
          description: 'só para caneludos',
          brand: 'nike',
          seller_id: 2,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'banana boat',
          description: 'putz',
          brand: 'nike',
          seller_id: 2,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
