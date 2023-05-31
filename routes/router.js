import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const router = express.Router();
router.use(express.json());

const BaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.API_KEY;

router.post('/', async (req,res)=>{
    
    const { cities } = req.body;
    if(!cities || !Array.isArray(cities) || cities.length === 0){
        return res.status(400).json({ error: 'Invalid cities data. Please provide an array of city names.' });
    }

    try {
        const forecasts = await Promise.all(
            cities.map(async (city) => {
                if(!city || typeof city !== 'string'){
                    return { error: 'Invalid city name. Please provide a valid string.' };
                }
                
                const response = await fetch(`${BaseUrl}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
                const data = await response.json();
                
                if(response.status !== 200){
                    return { error: 'Failed to fetch weather forecast.' };
                }
                
                return data;
            })
        );       
        res.status(200).json(forecasts);

    }catch(error){
        console.log("\n --SOME Error occured while forecast---\n"+error);
        res.status(500).json({error:"Some Error Occured"});
    }
});

export default router;