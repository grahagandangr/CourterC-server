'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
<<<<<<< HEAD

    let data = require('../data/categories.json')

    data.forEach(el => {

      el.updatedAt = el.createdAt = new Date()

    })

    await queryInterface.bulkInsert('Categories', data, {})
=======
>>>>>>> orderAndSchedule
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
<<<<<<< HEAD

    await queryInterface.bulkDelete('Categories')
=======
>>>>>>> orderAndSchedule
  }
};
