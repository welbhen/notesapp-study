/*                   THIS IS THE BACK-END
 *    To download the Node.js framework: Express, go to the terminal and use the command:
 *    npm install express --save
 *
 *    To install nodemon globally, we use:
 *    npm install nodemon -g
 *
 *    To install Handlebars, we use:
 *    npm install --save express-handlebars
 *
 *    To install Body Parser, we use:
 *    npm install --save body-parser
 *    
 *    To install Sequelize and MySQL, we use:
 *    npm install --save sequelize
 *    npm install --save mysql2
 *
 *    Node.js:		the JavaScript runtime (it allows us to run javascrip outside web browsers)
 *    Express:		the framework
 *    Handlebars:	html templates into JavaScript functions
 *    MySQL:		the database - we created a new db for this app called: notes
 *    Sequelize:	the JavaScript module that allow us to work with MySQL using JavaScript code
 *    Body Parser:	transform data from the user into a JavaScript object and send it inside 'req'
 */
 
 var express = require('express');
 const app = express();
 const handlebars = require('express-handlebars');
 const bodyParser = require('body-parser');
 const Post = require('./public/models/Post');
 
 
// we are gonna implement some CSS:
app.use(express.static('public'));
 
// Configurations ##########
 	// Template Engine - ### THIS IS FOR HANDLEBARS:
 		app.engine('handlebars', handlebars.engine({
				defaultLayout: 'main',
				runtimeOptions: {
          				allowProtoPropertiesByDefault: true,
           				allowProtoMethodsByDefault: false,
           		},
			}));
 		app.set('view engine', 'handlebars');
 	// Body Parser:
 		app.use(bodyParser.urlencoded({extended: false}));
 		app.use(bodyParser.json());
 		/*
 	// Events:
 		addNoteButton.addEventListener("click", () => {
			res.redirect('/notes');
		});
		*/
	// Routes:
		app.get('/', (req, res) => {
			Post.findAll({
				order: [['id', 'DESC']]
				}).then((posts) => {
						res.render('home', {
							style: 'notes.css',
							posts: posts
						});
					});
		});
		
		app.get('/notes', (req, res) => {
			res.render('form.handlebars', {
				style: 'form.css'
			});
		});
		app.post('/add', (req, res) => {
			// this will insert our post inside our table "posts", which is inside our database "notes"
			// req.body.? gets the fields from our user using the form we created (FRONT-END)
			Post.create({
				content: req.body.content
			}).then(() => {
				// res.send('Post created successfully!');
				res.redirect('/');
			}).catch((error) => {
				res.send('An error occurred: ' + error);
			})
		});
		app.get('/delete/:id', (req, res) => {
			Post.destroy({
				where: {'id': req.params.id}
			}).then(() => {
				//res.send('Post deleted!');
			 	res.redirect('/');
			}).catch((error) => {
				res.send('This post does not exist! Error: ' + error);
			})
		});
 
app.listen(8081, () => {
	console.log("Server opened! Use: http://localhost:8081");
});