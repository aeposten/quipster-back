import StoryModel from '../models/storyModel.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

//GET stories (all)
export const getStories = async (req, res) => {
	try {
		//async, finding all stories
		const storyModels = await StoryModel.find();
		//Returning story array
		res.status(200).json(storyModels);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//GET story (one specific)
export const getStory = async (req, res) => {
    const { id } = req.params;

    try {
        const story = await StoryModel.findById(id);
        
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//POST story (create)
export const createStory = async (req, res) => {
	const story = req.body;
	const newStoryModel = new StoryModel({ ...story, writer: req.parentId, createdAt: new Date().toISOString() });
	console.log(newStoryModel)
	try {
		await newStoryModel.save();
		res.status(201).json(newStoryModel);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

//PATCH (update) story
export const updateStory = async (req, res) => {
	const { id: _id } = req.params;
	const story = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('Story does not exist');

	const updatedStory = await StoryModel.findByIdAndUpdate(_id, story, {
		new: true,
	});

	res.json(updatedStory);
};

//PATCH (update) story by adding laughs
export const addLaughs = async (req, res) => {
	const { id } = req.params;
	if (!req.parentId) return res.json({message: 'Not authenticated'})
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('Story does not exist');

	const story = await StoryModel.findById(id);

	const index = story.laughs.findIndex((id)=> id === String(req.parentId))

	if (index === -1 ) {
		story.laughs.push(req.parentId)
	} else {
		story.laughs = story.laughs.filter((id) => id !== String(req.parentId))
	}
	const updatedStory = await StoryModel.findByIdAndUpdate(
		id,
		story,
		{ new: true }
	);

	res.status(200).json(updatedStory);
};

//DELETE story
export const deleteStory = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('Story does not exist');

	await StoryModel.findByIdAndRemove(id);

	res.json({ message: 'Deleted post' });
};
