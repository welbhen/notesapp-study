/*
 *     See the app.js
 */

 const db = require('./Database');
 // naming our table:
 const Post = db.sequelize.define('posts', {
	content: {
		type: db.Sequelize.TEXT
	}
});

//Post.sync({force: true}); // only use this code once: to create the table inside our database

module.exports = Post;