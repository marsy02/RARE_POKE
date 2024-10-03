$(document).ready(function() {
    // Get the Pokémon ID from the URL parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // Fetch Pokémon data from pokedex.json
    fetch("../pokedex.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pokedex => {
            // Get the Pokémon object based on the ID
            const pokemon = pokedex[id];
            if (pokemon) {
                // Extract details from the Pokémon object
                const name = pokemon["name"]["english"];
                const image = pokemon["image"]["hires"];
                const types = pokemon["type"];
                const species = pokemon["species"];
                const height = pokemon["profile"]["height"];
                const weight = pokemon["profile"]["weight"];
                const abilities = pokemon["profile"]["ability"];
                const desc = pokemon["description"];

                // Create HTML for types
                let typesHtml = types.map(type => `<span class="${type.toLowerCase()}">${type}</span>`).join(", ");
                
                // Create HTML for abilities
                let abilitiesHtml = abilities.map(ability => `<span>${ability[0]}</span>`).join(", ");

                // Display Pokémon details on the page
                $("#pokemon-page-name").text(name);
                $(".pokemon-page-image").html(`<img src="${image}" alt="${name}">`);
                $(".pokemon-page-id").text(pokemon["id"]);
                $(".pokemon-type").html(typesHtml);
                $(".pokemon-page-species").text(species);
                $(".pokemon-page-height").text(height);
                $(".pokemon-page-weight").text(weight);
                $(".pokemon-page-abilities").html(abilitiesHtml);
                $(".pokemon-page-description").text(desc);

                // Display base stats
                const baseStats = pokemon["base"];
                const hp = baseStats["HP"];
                const attack = baseStats["Attack"];
                const defense = baseStats["Defense"];
                const sp_attack = baseStats["Sp. Attack"];
                const sp_defense = baseStats["Sp. Defense"];
                const speed = baseStats["Speed"];
                const total = hp + attack + defense + sp_attack + sp_defense + speed;

                // Populate stats in the HTML
                $(".hp-val").text(hp);
                $(".attack-val").text(attack);
                $(".defense-val").text(defense);
                $(".sp-attack-val").text(sp_attack);
                $(".sp-defense-val").text(sp_defense);
                $(".speed-val").text(speed);
                $(".total").text(total);

                // Set progress bar widths
                $(".bar.hp div").animate({width: (hp / 255) * 100 + '%'});
                $(".bar.attack div").animate({width: (attack / 190) * 100 + '%'});
                $(".bar.defense div").animate({width: (defense / 230) * 100 + '%'});
                $(".bar.sp-attack div").animate({width: (sp_attack / 194) * 100 + '%'});
                $(".bar.sp-defense div").animate({width: (sp_defense / 230) * 100 + '%'});
                $(".bar.speed div").animate({width: (speed / 180) * 100 + '%'});
            } else {
                // Handle the case where the Pokémon is not found
                $("#pokemon-page-name").text("Pokémon not found.");
                $(".pokemon-page-description").text("No details available for this Pokémon.");
            }
        })
        .catch(error => {
            console.error('Error loading Pokémon data:', error);
            $("#pokemon-page-name").text("Error loading data.");
            $(".pokemon-page-description").text("Please try again later.");
        });
});
