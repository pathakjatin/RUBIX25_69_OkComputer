async function matchmaking(clinet) {
    try{
        await client.connect();
        const database = client.db('Hackathon');
        const teamsCollection = database.collection('matchmaking');
        const teams = await teamsCollection;
        return teams;
        console.log('Teams in the leaderboard:');
        console.log(teams);
    }catch(error){
        console.error('Error reading from MongoDB:', error);
    }
    
}
module.exports = {matchmaking};