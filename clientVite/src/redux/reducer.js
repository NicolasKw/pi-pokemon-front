import { ADD_POKEMON, CREATE_POKEMON, DELETE_POKEMON } from './actionsTypes';

const initialState = {
    pokemons: []
}

function reducer(state = initialState, { type, payload }) {
    switch(type) {

        case ADD_POKEMON:
            return {
                ...state, 
                pokemons: [...state.pokemons, payload]
            }

        case DELETE_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter(pokemon => pokemon.name !== payload)
            }

        default:
            return {
                ...state
            }
    }
}

export default reducer;