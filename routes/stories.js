import express from 'express';
import { getStories, getStory, createStory, updateStory, deleteStory, addLaughs } from '../controllers/stories.js';

//Define router using express
const router = express.Router()

//Story routes
router.get('/', getStories)
router.post('/', createStory)
router.patch('/:id', updateStory)
router.patch ('/:id/addLaughs', addLaughs);
router.delete('/:id', deleteStory)
export default router;