const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const { userData } = require('../../models/Userdata.js'); // Import the model
