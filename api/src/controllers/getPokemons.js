const axios = require('axios');
const { Pokemon } = require('../db');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/'

module.exports = async function getPokemons(req, res) {
    try {

        //* POKEMONS DE LA DB
        // Traigo toda la data de la DB
        const dataDB = await Pokemon.findAll();

        // Extraigo las propiedades de la data y guardo los Pokemons en un array de objetos
        let pokemonsDB = dataDB.map(elem => elem.dataValues);

        // Le agrego a cada Pokemon sus types asociados
        for(let i = 0 ; i < dataDB.length ; i++) {
            pokemonsDB[i].typesNames = [];
            const typesData = await dataDB[i].getTypes();
            typesData.forEach(elem => pokemonsDB[i].typesNames.push(elem.dataValues.name));
        }


        //* POKEMONS DE LA API
        // Cantidad de Pokemons que quiero traer de la API:
        const lastIdToBreak = 1025;;
        const firstIdFromBreak = 10001;
        const lastId = 10277;
        
        // Creo un array con todas las solicitudes a la API
        const apiRequests = [];
        for (let i = 1 ; i <= lastIdToBreak ; i++) {
            apiRequests.push(axios(`${URL_BASE}${i}/`));
        };
        for (let i = firstIdFromBreak ; i <= lastId ; i++) {
            apiRequests.push(axios(`${URL_BASE}${i}/`));
        };
        
        // Hago las solicitudes con Promise.all
        const apiResponses = await Promise.all(apiRequests)

        // Extraigo las propiedades del Pokemon de cada respuesta y guardo los Pokemons en un array de objetos
        const pokemonsAPI = apiResponses.map( response => {
            const { id, name, stats, height, weight, types, sprites  } = response.data;

            // Extraigo las propiedades hp, attack, defense y speed de stats
            const hp = stats[0].base_stat;
            const attack = stats[1].base_stat;
            const defense = stats[2].base_stat;
            const speed = stats[5].base_stat;

            // Extraigo los nombres de los tipos de types
            const typesNames = types.map(elem => elem.type.name);

            // Extraigo las imágenes de sprites
            const imageClassic = sprites.other.dream_world.front_default;
            const image3d = sprites.other.home.front_default;
            const imageArtistic = sprites.other['official-artwork'].front_default;
    
            return ({id, name, hp, attack, defense, speed, height, weight, imageClassic, image3d,  imageArtistic, typesNames})
        })
        

        //* DEVUELVO UN ARRAY CON LOS POKEMONS DE LA DB Y DE LA API
        const allPokemons = [...pokemonsDB, ...pokemonsAPI]
        return res.status(200).json(allPokemons)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}