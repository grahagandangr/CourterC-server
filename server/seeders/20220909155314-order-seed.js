"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let data = require("../data/order.json");

    data.forEach((el) => {
      el.updatedAt = el.createdAt = new Date();
    });

    await queryInterface.bulkInsert("Orders", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
<<<<<<< HEAD
     */
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
