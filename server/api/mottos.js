import dbConnect from "../utils/dbConnect"; // Import the database connection
import Motto from "../models/Motto"; // Import the Motto model

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database
  {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust origin as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS,POST,PATCH'); // Or other methods you allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Or other headers
    res.setHeader('x-robots-tag', 'noindex');
    res.status(200).end(); // Respond with 200 OK for preflight
} 
  if (req.method === "GET") {
    try {
      // Check if a mottoId is provided in the query parameters
      const { mottoId } = req.query;
      if (mottoId) {
        // Fetch a specific motto by ID
        const motto = await Motto.find({ id: mottoId });
        if (!motto) {
          return res.status(404).json({ error: "Motto not found" });
        }
        return res.status(200).json(motto[0]); // Return the specific motto
      } else {
        // Fetch all mottos
        const mottos = await Motto.find(); // Fetch all mottos

        return res.status(200).json(mottos); // Return all mottos
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mottos" });
    }
  } else if (req.method === "POST") {
    try {
      const { id, text, story } = req.body; // Destructure the request body
      const newMotto = new Motto({ id, text, story }); // Create a new motto
      await newMotto.save(); // Save the motto to the database
      res.status(201).json(newMotto);
    } catch (error) {
      res.status(500).json({ error: "Failed to save motto" });
    }
  } else if (req.method === "PATCH") {

    try {
      const { mottoId, like } = req.query; // Get mottoId from the query parameters
      const motto = (await Motto.find({id:mottoId}))[0];
      if (!motto) {
        return res.status(404).json({ error: "Motto not found" });
      }
      // Increment the likes
      if (like==='true') {
        motto.likes += 1; // Increment likes
    } else {
        if(motto.likes>0){
            motto.likes -=1 ; // Decrement likes, ensuring it doesn't go below 0
        }
    }      
        await motto.save(); // Save the updated motto
        const allMottos = await Motto.find(); // Retrieve all mottos

      return res.status(200).json(allMottos); // Return the updated motto
    } catch (error) {
      console.error("Error updating motto likes:", error); // Log the error for debugging
      return res.status(500).json({ error: "Failed to update motto likes" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
