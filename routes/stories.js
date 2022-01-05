import express from 'express';
import { getStories, getStory, createStory, updateStory, deleteStory } from '../controllers/stories.js';

//Define router using express
const router = express.Router()

//Story routes
router.get('/', getStories)
router.post('/', createStory)
router.patch('/:id', updateStory)
router.delete('/:id', deleteStory)
export default router;