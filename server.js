const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //Used AI to figure out that i need to add IDS to url
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
        console.log(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
        if (!response.ok) {
            console.log(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&query=${id}`);
            if (!response.ok) {
                return res.status(404).json({ error: "Crypto not found by name" });
            }
        }

        const data = await response.json();
        //Used AI to figure out that I need to use const coin = data[0]
        const coin = data[0]; // Get the first (and only) coin from the response
        // Send back only the data we need
        res.json({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
        });
        console.log(coin.id)
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});