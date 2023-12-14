const { Pokemon } = require('../db')

module.exports = async function deletePokemon(req, res) {

    try {
        const { idPokemon } = req.params;
    
        const pokemon = await Pokemon.findByPk(idPokemon);
    
        if(pokemon) {
            await pokemon.destroy();
            res.status(200).json({message: 'Pokemon deleted successfully'})
        } else {
            res.status(200).json({message: `No Pokemon with id ${idPokemon} in DB`})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}