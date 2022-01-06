import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import storiesRoutes from './routes/stories.js'
import parentsRoutes from './routes/parents.js'



//Using express for the app
const app = express();

//.env - seeeeeccccrrrreetttt
dotenv.config();

//5 mb limit for file uploads
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//Cross-Origin Resource Sharing
app.use(cors());

//Setting routes for stories
app.use('/stories', storiesRoutes)

//setting routes for parents
app.use('/parent', parentsRoutes)

//Mongoose server connection URL and Port
const PORT = process.env.PORT
mongoose
	.connect(process.env.DB_URL)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Success! Server running on port: ${PORT}`)
		)
	);
