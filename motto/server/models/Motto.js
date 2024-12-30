import mongoose from 'mongoose';

// Define the schema for the Motto
const mottoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for each motto
    text: { type: String, required: true }, // The motto text
    story: { type: String, required: true }, // The story associated with the motto
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const Motto = mongoose.models.Motto || mongoose.model('Motto', mottoSchema);

export default Motto;
