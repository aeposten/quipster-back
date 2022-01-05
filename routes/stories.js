import express from 'express';
import { getStories, getStory, createStory, updateStory } from '../controllers/stories.js';

//Define router using express
const router = express.Router()

//Story routes
router.get('/', getStories)
router.post('/', createStory)
router.patch('/:id', updateStory)
export default router;