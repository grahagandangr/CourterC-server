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
     let data = require('../data/schedule.json')

     data.forEach(el => {
 
       el.updatedAt = el.createdAt = new Date()
 
     })
 
     await queryInterface.bulkInsert('Schedules', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Schedules', null, {});
  }
};
