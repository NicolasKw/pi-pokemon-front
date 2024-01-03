const { Pokemon } = require('../db')

module.exports = async function deletePokemon(req, res) {

    try {
        const { idPokemon } = req.params;

        // Busco al Pokemon en la DB por id
        const pokemon = await Pokemon.findByPk(idPokemon);
    
        // Si existe en la DB:
        if(pokemon) {
            await pokemon.destroy();
            res.status(200).json({message: 'Pokemon deleted successfully'})
            
        // Si no existe en la DB:
        } else {
            res.status(200).json({message: `No Pokemon with id ${idPokemon} in DB`})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}