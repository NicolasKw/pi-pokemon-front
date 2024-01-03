const axios = require('axios');
const { Pokemon, Types } = require('../db');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/'

module.exports = async function getPokemonsByName(req,res) {

    // Obtengo el nombre por query y lo paso a minúsculas
    const nameToFind = req.query.name.toLowerCase();

    // Si no se pasa ningún nombre por query
    if(!nameToFind) {

        res.status(400).json({message: 'No name requested'})

    // Si se pasa un nombre por query
    } else {

        try {
            // Busco el Pokemon en la DB:
            let [pokemon] = await Pokemon.findAll({ where: {name: nameToFind} });
    
            // Si no encuentra al Pokemon en la DB lo busca en la API:
            try {
                if(!pokemon) {
                    
                    pokemon = await axios(`${URL_BASE}${nameToFind}`);

                    // Si encuentra al Pokemon en la API:
                    const { id, name, stats, height, weight, types, sprites  } = pokemon.data;

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

                    // Devuelvo un JSON con el pokemon encontrado
                    return res.status(200).json({id, name, hp, attack, defense, speed, height, weight, imageClassic, image3d,  imageArtistic, typesNames});
        
                // Si encuentra al Pokemon en la DB:
                } else {
                    
                    const { id, name, hp, attack, defense, speed, height, weight, imageClassic, image3d, imageArtistic } = pokemon.dataValues

                    // Traigo todos los types asociados a ese Pokemon
                    const typesNames = (await pokemon.getTypes()).map(elem => elem.name)

                    // Retorno la info del pokemon y sus types
                    res.status(200).json({ id, name, hp, attack, defense, speed, height, weight, typesNames, imageClassic, image3d, imageArtistic });
                }
    
            // Si no encuentra al Pokemon en la API:
            } catch (error) {
                res.status(404).json({message: `Pokemon with name ${nameToFind} not found`})
            }
            
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }    
}