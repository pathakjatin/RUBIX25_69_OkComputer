const express=require('express');
const {MongoClient}=require('mongodb');
const router=express.Router();
const {matchmaking}=require('../../models/MatchMaking.js');
const e = require('express');
router.get('/matchmaking',async(req,res)=>{
  const uri='mongodb+srv://yash6961:tznzeQKM1xEiXqHk@cluster0.z6zws.mongodb.net/Hackathon?retryWrites=true&w=majority&appName=Cluster0';
  const client=new MongoClient(uri);
    try{
        await client.connect();
        const matchmakingCollection=await matchmaking(client);
        const matchmaking=await matchmakingCollection.find({}).toArray();
        res.status(200).json(matchmaking);
    }catch(err){
        console.error('Error fetching matchmaking:',err.message);
        res.status(500).json({error:'Internal Server Error'});
    }finally{
        await client.close();
    }
});
router.post('/matchmaking',async(req,res)=>{
    const uri='mongodb+srv://yash6961:tznzeQKM1xEiXqHk@cluster0.z6zws.mongodb.net/Hackathon?retryWrites=true&w=majority&appName=Cluster0';
    const client=new MongoClient(uri);
    try{
        await client.connect();
        const matchmakingCollection=await matchmaking(client);
        const newMatchmaking={
            name:req.body.name,
            domain:req.body.domain,
            email:req.body.email,
        };
        const result=await matchmakingCollection.insertOne(newMatchmaking);
        res.status(201).json({message:'Matchmaking created successfully',id:result.insertedId});
    }catch(err){
        console.error('Error creating matchmaking:',err.message);
        res.status(500).json({error:'Internal Server Error'});
    }
});
module.exports=router;  
