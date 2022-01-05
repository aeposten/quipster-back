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
	res.send('Response Sent!');
};

//POST story (create)
export const createStory = async (req, res) => {
	const { title, description, selectedFile, parent } = req.body;
	const newStory = new StoryModel({ title, description, selectedFile, parent });
	try {
		await newStory.save();
		res.status(201).json(newStory);
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

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('Story does not exist');

	const story = await StoryModel.findById(id);
	const updatedStory = await StoryModel.findByIdAndUpdate(
		id,
		{ laughs: story.laughs + 1 },
		{ new: true }
	);

	res.json(updatedStory);
};

//DELETE story
export const deleteStory = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('Story does not exist');

	await StoryModel.findByIdAndRemove(id);

	res.json({ message: 'Deleted post' });
};
