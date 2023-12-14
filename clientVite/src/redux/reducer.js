import { ADD_POKEMONS, ADD_TYPES, CREATE_POKEMON, DELETE_POKEMON, TYPE_FILTER, ORIGIN_FILTER, NAME_ORDER, ATTACK_ORDER } from './actionsTypes';

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}

function reducer(state = initialState, { type, payload }) {
    switch(type) {

        case ADD_POKEMONS:
            return {
                ...state, 
                pokemons: payload,
                allPokemons: payload
            }

        case ADD_TYPES:
            return {
                ...state,
                types: payload
            }

        case DELETE_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter(pokemon => pokemon.name !== payload),
                allPokemons: state.allPokemons.filter(pokemon => pokemon.name !== payload)
            }

        case TYPE_FILTER:
            return {
                ...state,
                pokemons: 
                    state.allPokemons.filter(pokemon => {
                        if(payload !== 'all') return pokemon.typesNames.includes(payload);
                        else return true;
                    })
            }

        case ORIGIN_FILTER:
            return {
                ...state,
                pokemons:
                    state.allPokemons.filter(pokemon => {
                        if(payload === 'API') return (typeof pokemon.id === 'number') ;
                        else if (payload === 'DB') return (typeof pokemon.id !== 'number');
                        else return true;
                    })
            }

        case NAME_ORDER:
            if(payload === 'A') {
                return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
                }
            } else return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => b.name.localeCompare(a.name))
            }
            
        case ATTACK_ORDER:
            if(payload === 'A') {
                return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.attack - b.attack)
                }
            } else return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => b.attack - a.attack)
            }


        default:
            return {
                ...state
            }
    }
}

export default reducer;