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

     el.location = Sequelize.fn(
      "ST_GeomFromText",
      `POINT(${el.location[0]} ${el.location[1]})`
    );
    el.createdAt = new Date();
    el.updatedAt = new Date();
=======
>>>>>>> 56971f3fb7898ddfcab026d954f89c85ee05a574
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
