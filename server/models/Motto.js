import mongoose from 'mongoose';
delete mongoose.models.Motto;

// Define the schema for the Motto
const mottoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for each motto
    text: { type: String, required: true }, // The motto text
    story: { type: String, required: true },
    likes: { type: Number, default: 0 }, // The number of likes, default to 0
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const Motto = mongoose.models.Motto || mongoose.model('Motto', mottoSchema);

export default Motto;
