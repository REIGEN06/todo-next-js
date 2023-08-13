'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Todos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			title: {
				type: Sequelize.STRING,
			},

			done: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('Todos');
	},
};
