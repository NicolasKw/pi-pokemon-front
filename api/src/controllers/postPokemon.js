const { Pokemon, Types, Image } = require('../db');

module.exports = async function postPokemon(req, res) {
    try {
        const { 
            id, 
            name, 
            id: imageId, 
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight, 
            types,
            dream_world,
            home,
            artwork } = req.body;
    
        // Se busca o crea la entrada en el modelo Pokemon
        const [pokemon, createdPokemon] = await Pokemon.findOrCreate({ where: {id, name, imageId, hp, attack, defense, speed, height, weight} });
        
        // Se buscan los tipos en el modelo Types
        const typesNames = types.map(type => type.name); // Se extraen los nombres de los tipos recibidos
        console.log(typesNames)
        const getTypes = await Types.findAll({ where: {name: typesNames} }) // Se buscan esos nombres en Types
        const getTypesIds = getTypes.map(elem => elem.id) // Se extraen los id de esos nombres
        // Se asocian Pokemon y Types en la tabla intermedia
        await pokemon.addTypes(getTypesIds);

        // Se busca o crea la/s imágenes en el modelo Images
        const imageAttributes = { id: imageId, dream_world};
        home && imageAttributes.home;
        artwork && imageAttributes.artwork;
        const [image, createdImage] = await Image.findOrCreate({ where: imageAttributes })
        // Se asocia Image a Pokemon
        await pokemon.setImage(imageId)

        // Devuelvo un JSON con el resultado de la solicitud
        createdPokemon
            ? res.status(201).json({message: "Pokemon has been created successfully"})
            : res.status(200).json({message: "Pokemon was already created"});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}