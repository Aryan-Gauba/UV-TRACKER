import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

// Your OpenUV API Key goes here
const OPENUV_KEY = process.env.OPENUV_KEY;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { data: null, recommendation: null, city: null, error: null });
});

app.post("/get-uv", async (req, res) => {
    const city = req.body.city;

    try {
        // STEP 1: Convert city name to Lat/Lng using Nominatim (Free, no key needed)
        const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`, {
            headers: { 'User-Agent': 'MyCapstoneProject/1.0' }
        });        
        if (geoResponse.data.length === 0) {
            throw new Error("City not found");
        }

        const { lat, lon } = geoResponse.data[0];

        // STEP 2: Get UV data from OpenUV
        const uvResponse = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
            headers: { 'x-access-token': OPENUV_KEY }
        });

        const uvIndex = uvResponse.data.result.uv;
        let recommendation = "";
        let colorClass = "";

        // STEP 3: Logic to determine sunscreen advice
        if (uvIndex <= 2) {
            recommendation = "Low risk. No protection needed. Enjoy the day!";
            colorClass = "low";
        } else if (uvIndex <= 5) {
            recommendation = "Moderate risk. Wear a hat and apply SPF 30+ every 2 hours.";
            colorClass = "moderate";
        } else if (uvIndex <= 7) {
            recommendation = "High risk! Seek shade, wear protective clothing, and use SPF 50+.";
            colorClass = "high";
        } else {
            recommendation = "Extreme risk! Avoid being outside during midday. Maximum sun protection required.";
            colorClass = "extreme";
        }

        res.render("index", { 
            data: uvResponse.data.result, 
            city: city, 
            recommendation: recommendation,
            colorClass: colorClass,
            error: null 
        });

    } catch (error) {
        console.error(error.message);
        res.render("index", { 
            data: null, 
            error: "Could not find that city or API limit reached. Try again!",
            recommendation: null,
            city: null
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});