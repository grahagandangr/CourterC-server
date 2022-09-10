'use strict';

<<<<<<< HEAD
const { hashPassword } = require('../helpers');

=======
>>>>>>> orderAndSchedule
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
     let user = require('../data/users.json')
     user.forEach(el =>{
      el.location = Sequelize.fn(
        "ST_GeomFromText",
        `POINT(${el.location[0]} ${el.location[1]})`
      );
     el.password = hashPassword(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
     return el
    })
     await queryInterface.bulkInsert('Users', user)
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

     await queryInterface.bulkDelete('Users', null, {})
=======
>>>>>>> orderAndSchedule
  }
};
