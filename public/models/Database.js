/*
 *     See the app.js
 */

const Sequelize = require('sequelize');
 	// Database MySQL connection:
 		const sequelize = new Sequelize('notes', 'root', '1322', {
			host: "localhost",
			dialect: 'mysql'
		})
		
// Let's export these modules:
module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}