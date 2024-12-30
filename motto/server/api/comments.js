import dbConnect from '../utils/dbConnect'; // Import the database connection
import Comment from '../models/Comment'; // Import the Motto model

export default async function handler(req, res) {
    await dbConnect(); // Connect to the database

    if (req.method === 'GET') {
        try {
            const comments = await Comment.find({ mottoId: req.query.mottoId }); // Fetch all mottos
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch comments' });
        }
    } else if (req.method === 'POST') {
        try {
            const { id, text, mottoId } = req.body; // Destructure the request body
            const newComment = new Comment({ id, text, mottoId }); // Create a new motto
            await newComment.save(); // Save the motto to the database
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save comment' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
