'use strict';

require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const basename = path.basename(__filename);

type dbType = {
	sequelize: string;
	Sequelize: string;
	Todo: string;
};

const db: dbType = {
	sequelize: '',
	Sequelize: '',
	Todo: '',
};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

const Todo = require('./todo')(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Todo = Todo;

module.exports = db;
