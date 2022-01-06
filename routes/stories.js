import express from 'express';
import {
	getStories,
	getStory,
	createStory,
	updateStory,
	deleteStory,
	addLaughs,
} from '../controllers/stories.js';

//Import middleware
import login from '../middleware/login.js';

//Define router using express
const router = express.Router();

//Story routes
router.get('/', getStories);
router.post('/', login, createStory);
router.patch('/:id', login, updateStory);
router.patch('/:id/addLaughs', login, addLaughs);
router.delete('/:id', login, deleteStory);

export default router;
