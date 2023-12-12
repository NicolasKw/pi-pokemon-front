const axios = require('axios');
const { Pokemon, Types } = require('../db');

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

module.exports = async function getPokemonById (req,res) {
    try {
        const { idPokemon } = req.params;

        // Busco el Pokemon en la DB:
        let pokemon = await Pokemon.findByPk(idPokemon);

        try {
            // Si no encuentra al Pokemon en la DB lo busca en la API:
            if(!pokemon) {
                pokemon = await axios(`${URL_BASE}${idPokemon}`);

                // Si encuentra al Pokemon en la API:
                const { id, name, stats, height, weight, types: typesArray, sprites: images } = pokemon.data

                const imageDreamWorld = images.other.dream_world.front_default;
                const imageHome = images.other.home.front_default;
                const imageArtwork = images.other['official-artwork'].front_default;

                // Extraigo los atributos necesarios que se encuentran en la propiedad base_stat:
                //! MEJORAR
                const hp = stats[0].base_stat;
                const attack = stats[1].base_stat;
                const defense = stats[2].base_stat;
                const speed = stats[5].base_stat;
                
                // Extraigo los nombres de los types es typesArray:
                //! MEJORAR
                const typesNamesArrayOfObjects = typesArray.map(type => ({ name: type.type.name }));
                const typesNamesArrayOfNames = typesNamesArrayOfObjects.map(elem => elem.name);

                // Obtengo los IDs de los typesNames del modelo Types:
                const pokemonTypes = await Types.findAll({ 
                    attributes: ['id', 'name'],
                    where: {name: typesNamesArrayOfNames}
                })

                // Devuelvo un JSON con el pokemon encontrado
                return res.status(200).json({id, name, hp, attack, defense, speed, height, weight, pokemonTypes, imageDreamWorld, imageHome, imageArtwork});

            // Si encuentra al Pokemon en la DB:
            } else {
                // Traigo todos los types asociados a ese Pokemon
                const pokemonTypes = (await pokemon.getTypes()).map(type => ({id: type.id, name: type.name}))

                // Retorno la info del pokemon y sus types
                res.status(200).json({ pokemon, pokemonTypes });
            }

        // Si no encuentra al Pokemon en la API:
        } catch (error) {
            res.status(404).json({message: `Pokemon with ID ${idPokemon} not found`})
        }

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}