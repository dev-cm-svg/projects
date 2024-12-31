import handler from '../../server/api/mottos.js'; // Adjust the import path
res.setHeader('Access-Control-Allow-Origin', process.env.API_URL); // Allow your frontend origin
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods

export default handler; // Export the handler
