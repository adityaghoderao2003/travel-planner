const express = require('express');
const app = express();
const connectDB = require('./config/db')
const cors = require("cors");
const triproutes = require('./routes/triproutes')
const userroutes = require('./routes/userroutes');
const PORT = 4001;

require("dotenv").config();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/plan-my-trip", triproutes);
app.use("/user", userroutes);


app.get('/', (req,res)=>{
    console.log('start')
    res.send('hello there')
})

app.listen(PORT);