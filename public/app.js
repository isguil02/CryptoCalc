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

        const response = await fetch(`/pokemon/${id}`);

        if (!response.ok) {
            throw new Error("Pokemon not found!");
        }

        const pokemon = await response.json();

        // Populate the card
        document.getElementById("pokemonID").textContent = pokemon.id;
        document.getElementById("pokemonSprite").src = pokemon.image;
        document.getElementById("pokemonName").textContent = pokemon.symbol;
        document.getElementById("pokemonName").textContent = pokemon.name;
        

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