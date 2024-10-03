$(document).ready(function() {
    console.log("Document is ready");

    // Fetch Pokémon data from pokedex.json
    fetch("pokedex.json")
        .then(response => {
            if (!response.ok) {
                console.error('Network response was not ok');
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pokedex => {
            console.log("Data loaded successfully", pokedex);
            
            pokedex.forEach(pokemon => {
                let id = pokemon["id"];
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["hires"];
                let types = pokemon["type"];
                let typesHtml = types.map(type => `<span class="${type.toLowerCase()}">${type}</span>`).join(", ");

                // Append Pokémon card to the container
                $(".pokemon-container").append(
                    `<div class="card">
                     <a href="pokemon/pokemonattributes.html?id=${id}">
                     

                        <img src="${image}" alt="${name}">
                        <ul>
                            <li class="pokemon-id">#${id}</li>
                            <li class="pokemon-name">${name}</li>
                            <li class="pokemon-type">${typesHtml}</li>
                        </ul>
                    </div>`
                    
                );
                
                
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            $(".pokemon-container").append(`<p>Failed to load Pokémon data. Please try again later.</p>`);
        });
});
