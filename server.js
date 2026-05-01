require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await fetch(`https://openweathermap.org{city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod !== 200) return res.status(data.cod).json({ error: data.message });
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = app;
