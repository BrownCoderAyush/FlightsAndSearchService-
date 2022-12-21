'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert('Cities', [{
      id: 25 , 
      name : "Mumbai",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 26 , 
      name : "allahbad",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 20 , 
      name : "delhi",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 21 , 
      name : "pune",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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

