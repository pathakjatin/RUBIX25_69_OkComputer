async function userData(client) {
  try{
    const database = client.db('Hackathon');
    const userCollection = database.collection('userdata');
    return userCollection;
  }catch(error){
    console.error('Error accessing MongoDB collection:', error);
    throw new Error('Error accessing the MongoDB collection');
  }
  
}
module.exports = { userData };