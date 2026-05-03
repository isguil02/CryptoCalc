async function loadCrypto() {
    const id = document.getElementById("cryptoID").value;
    const status = document.getElementById("status");
    const card = document.getElementById("cryptoCard");

    // Validate input
    if (!id.trim()) {
        status.textContent = "Please enter a crypto ID.";
        card.classList.add("hidden");
        return;
    }

    try {
        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/${id}`);

        if (!response.ok) {
            throw new Error("Crypto not found!");
        }

        const crypto = await response.json();

        // Populate the card
        document.getElementById("cryptoImage").src = crypto.image;
        document.getElementById("CryptoName").textContent = crypto.name;
        document.getElementById("cryptoPrice").textContent = crypto.current_price;
        document.getElementById("cryptoMarketCap").textContent = crypto.market_cap;
        document.getElementById("cryptoMarketCapRank").textContent = crypto.market_cap_rank;
        document.getElementById("cryptoSymbol").textContent = crypto.symbol;
        document.getElementById("cryptoHigh").textContent = crypto.high_24h;
        document.getElementById("cryptoLow").textContent = crypto.low_24h;

        status.textContent = "";
        card.classList.remove("hidden");

    } catch (error) {
        status.textContent = "Error: " + error.message;
        card.classList.add("hidden");
        console.error(error);
    }
}

// Allow pressing Enter to search
document.getElementById("cryptoID").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadCrypto();
    }
});