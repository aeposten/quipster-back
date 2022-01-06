import mongoose from 'mongoose';

//Creating story Schema
const storySchema = mongoose.Schema({
	title: String,
	description: String,
	name: String,
	writer: String,
	selectedFile: String,
	laughs: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

//Exporting the schema
const StoryModel = mongoose.model('StoryModel', storySchema)
export default StoryModel;