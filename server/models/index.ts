'use strict';

const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
import { Sequelize } from 'sequelize-typescript';
import Todo from './todo';

const sequelize = new Sequelize({
	database: config.database,
	dialect: config.dialect,
	username: config.username,
	password: config.password,
	storage: ':memory:',
	models: [Todo],
});

module.exports = sequelize;
