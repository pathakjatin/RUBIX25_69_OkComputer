async function storeHackathon(client) {
    try {
      const database = client.db('Hackathon');
      const hackathonsCollection = database.collection('store'); // Ensure collection exists
      return hackathonsCollection; // Return the collection to be used in the route
    } catch (error) {
      console.error('Error accessing MongoDB collection:', error);
      throw new Error('Error accessing the MongoDB collection');
    }
  }
  
  module.exports = { storeHackathon };
  