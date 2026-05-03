async function loadPokemon() {
    const id = document.getElementById("pokemonId").value;
    const status = document.getElementById("status");
    const card = document.getElementById("pokemonCard");

    // Validate input
    if (!id || id < 1 || id > 151) {
        status.textContent = "Please enter a valid Pokémon ID between 1 and 151.";
        card.classList.add("hidden");
        return;
    }

    try {
        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/${id}`);

        if (!response.ok) {
            throw new Error("Pokemon not found!");
        }

        const crypto = await response.json();

        // Populate the card
        document.getElementById("pokemonID").textContent = crypto.id;
        document.getElementById("pokemonSprite").src = crypto.image;
        document.getElementById("pokemonName").textContent = crypto.name;
        console.log(crypto.name)

        status.textContent = "";
        card.classList.remove("hidden");

    } catch (error) {
        status.textContent = "Error: " + error.message;
        card.classList.add("hidden");
        console.error(error);
    }
}

// Allow pressing Enter to search
document.getElementById("pokemonId").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadPokemon();
    }
});