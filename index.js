import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/forecast',router);

app.get('/', (req,res)=>{
    res.send("Hello there. Welcome to the weather app.");
});

app.listen(PORT, ()=>{
    console.log("Server listening at port "+PORT);
})