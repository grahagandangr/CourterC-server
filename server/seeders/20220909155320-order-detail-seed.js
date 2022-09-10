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
     let data = require('../data/orderDetail.json')

     data.forEach(el => {
 
       el.updatedAt = el.createdAt = new Date()
 
     })
 
     await queryInterface.bulkInsert('OrderDetails', data, {})
=======
>>>>>>> orderAndSchedule
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
<<<<<<< HEAD
     */
     await queryInterface.bulkDelete('OrderDetails', null, {});
=======
     * await queryInterface.bulkDelete('People', null, {});
     */
>>>>>>> orderAndSchedule
  }
};
