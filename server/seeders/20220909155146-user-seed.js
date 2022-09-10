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
     let user = require('../data/users.json')
     user.forEach(el =>{
     el.password = hashPassword(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
     return el
    })
     await queryInterface.bulkInsert('Users', user)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Users', null, {})
  }
};
