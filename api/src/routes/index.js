const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require('../controllers/getPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonsByName = require('../controllers/getPokemonsByName');
const postPokemon = require('../controllers/postPokemon');
const getTypes = require('../controllers/getTypes');
const deletePokemon = require('../controllers/deletePokemon');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getPokemons);
router.get('/pokemons/name', getPokemonsByName);
router.get('/pokemons/:idPokemon', getPokemonById);
router.post('/pokemons', postPokemon);
router.get('/types', getTypes);
router.delete('/pokemons/:idPokemon', deletePokemon);


module.exports = router;
