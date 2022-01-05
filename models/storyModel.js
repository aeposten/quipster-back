import mongoose from 'mongoose';

//Creating story Schema
const storySchema = mongoose.Schema({
	title: String,
	description: String,
	parent: String,
	selectedFile: String,
	laughs: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

//Exporting the schema
const StoryModel = mongoose.model('StoryModel', storySchema)
export default StoryModel;