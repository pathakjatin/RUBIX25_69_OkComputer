

// Function to interact with the MongoDB database
 async function readLeaderboard(client) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Get the database and collection
    const database = client.db('Hackathon'); // Use your database name
    const teamsCollection = database.collection('teams');// Use your collection name
    const teams = await teamsCollection;
    return teams;

    console.log('Teams in the leaderboard:');
    console.log(teams);
  } catch (error) {
    console.error('Error reading from MongoDB:', error);
  }
}
module.exports = { readLeaderboard };

// Call the function to insert a new leaderboard entry

