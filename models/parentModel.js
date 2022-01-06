import mongoose from 'mongoose';

//Creating parent Schema
const parentSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
});

//Exporting the schema
const ParentModel = mongoose.model('Parent', parentSchema)
export default ParentModel;