
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
require('dotenv').config();
const authRoutes = require('./routes/auth'); 

const app=express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] , 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true }));

app.use(express.json());

app.use('/auth', authRoutes);




mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDb Connected successfully"))
  .catch(err=>console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
