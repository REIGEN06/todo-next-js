'use strict';

const { QueryInterface } = require('sequelize');
const { DataType } = require('sequelize-typescript');

module.exports = {
	async up(QueryInterface) {
		await QueryInterface.createTable('Todos', {
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			title: {
				type: DataType.STRING,
			},

			done: {
				type: DataType.BOOLEAN,
			},

			createdAt: {
				allowNull: false,
				type: DataType.DATE,
			},

			updatedAt: {
				allowNull: false,
				type: DataType.DATE,
			},
		});
	},

	async down(QueryInterface) {
		await QueryInterface.dropTable('Todos');
	},
};
