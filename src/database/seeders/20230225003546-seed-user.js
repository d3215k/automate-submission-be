"use strict";

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john@example.com",
          gender: "male",
          city: "bandung",
          password_hash:
            "$2a$08$e4GOyac7ah3ZMv4ve/xSBO6RdHjgq6u6hbpklecrUliOGRwXaeT76", // password
        },
        {
          name: "Jane Doe",
          email: "jane@example.com",
          gender: "fale",
          city: "jakarta",
          password_hash:
            "$2a$08$e4GOyac7ah3ZMv4ve/xSBO6RdHjgq6u6hbpklecrUliOGRwXaeT76", // password
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
