import mongoose from 'mongoose';
// Clear the model cache
delete mongoose.models.Comment;

const commentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Custom ID field
    text: { type: String, required: true },
    mottoId: { type: String, required: true },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
