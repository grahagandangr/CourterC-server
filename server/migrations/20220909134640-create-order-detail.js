"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      CourtCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "CourtCategories",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      OrderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ScheduleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderDetails");
  },
};
