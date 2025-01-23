async function storeHackathon(client) {
    try{
        await client.connect();
        const database = client.db('Hackathon');
        const hackathonsCollection = database.collection('store');
        const hackathons = await hackathonsCollection;
        return hackathons;


    }catch(error){
        console.error('Error reading from MongoDB:', error);
    }
    
}
module.exports = {storeHackathon};