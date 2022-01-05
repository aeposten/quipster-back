import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storiesRoutes from './routes/stories.js'


//Using express for the app
const app = express();

//5 mb limit for file uploads
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//Cross-Origin Resource Sharing
app.use(cors());

//Setting routes for stories
app.use('/stories', storiesRoutes)

//Mongoose server connection URL and Port
const DB_URL =
	'mongodb+srv://aeposten:5YewRMb4iZ4-wVy@little-quipster.qjehk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
	.connect(DB_URL)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Success! Server running on port: ${PORT}`)
		)
	);
