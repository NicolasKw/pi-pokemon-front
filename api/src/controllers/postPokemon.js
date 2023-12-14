const { Pokemon, Types } = require('../db');

module.exports = async function postPokemon(req, res) {
    try {
        const { 
            name, 
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight, 
            types,
            imageClassic,
            image3d,
            imageArtistic } = req.body;
    
        // Se busca o crea la entrada en el modelo Pokemon
        const [pokemon, createdPokemon] = await Pokemon.findOrCreate({ where: {name, hp, attack, defense, speed, height, weight, imageClassic} });

        // Agrego image3d e imageArtistic si fueron recibidas
        image3d && pokemon.image3d;
        imageArtistic && pokemon.imageArtistic;
        
        // Se buscan los tipos en el modelo Types
        const getTypes = await Types.findAll({ where: {name: types} }) // Se buscan esos types en Types
        const getTypesIds = getTypes.map(elem => elem.id) // Se extraen los id de esos types
        // Se asocian Pokemon y Types en la tabla intermedia
        await pokemon.addTypes(getTypesIds);

        // Devuelvo un JSON con el resultado de la solicitud
        createdPokemon
            ? res.status(201).json({message: "Pokemon has been created successfully"})
            : res.status(200).json({message: "Pokemon was already created"});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}