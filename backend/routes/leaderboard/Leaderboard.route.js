const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const  {readLeaderboard}  = require('../../models/Leaderboard.js'); // Correct path to the Leaderboard model

// Route to fetch leaderboard data
router.get('/leaderboard', async (req, res) => {
  
  const uri = 'mongodb+srv://yash6961:tznzeQKM1xEiXqHk@cluster0.z6zws.mongodb.net/Hackathon?retryWrites=true&w=majority&appName=Cluster0';
  const client = await new MongoClient(uri);
 
  
  // Fetch and sort leaderboard entries by score in descending order
  const leaderboard = await readLeaderboard(client);
  console.log('Leaderboard:', leaderboard);
  const leaderboardinfo = await leaderboard.find().sort({ score: -1 }); // Sort by score
try{
  // Add rank to each team based on their position in the sorted list
  var index = 0;
  const leaderboardWithRank = await leaderboardinfo.map((team) =>{
    index = index+1;
    return ({
    rank: index,  // Rank is index + 1 (1-based index)
    teamName: team.team_name,
    score: team.score,
    members: team.members,

})});

index = 0;
    const result = await leaderboardWithRank.toArray();
    res.send(result);
     // Send leaderboard data as response
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

module.exports = router;
