const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //Used AI to figure out that i need to add IDS to url
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
        console.log(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
        if (!response.ok) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        const data = await response.json();

        // Send back only the data we need
        res.json({
            id: data.id,
            symbol: data.symbol,
            name: data.name,
            image: data.image,

        });
        console.log(data.id)
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});