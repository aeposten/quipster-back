import mongoose from 'mongoose';

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


const StoryModel = mongoose.model('StoryModel', storySchema)
export default StoryModel;