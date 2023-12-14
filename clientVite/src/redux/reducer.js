import { GET_POKEMONS, GET_TYPES, DELETE_POKEMON, TYPE_FILTER, ORIGIN_FILTER, NAME_ORDER, ATTACK_ORDER, ADD_POKEMON, SEARCH_POKEMONS } from './actionsTypes';

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}

function reducer(state = initialState, { type, payload }) {
    switch(type) {

        case GET_POKEMONS:
            return {
                ...state, 
                pokemons: payload,
                allPokemons: payload
            }

        case GET_TYPES:
            return {
                ...state,
                types: payload
            }

        case ADD_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload],
                allPokemons: [...state.allPokemons, payload]
            }

        case DELETE_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter(pokemon => pokemon.id !== payload),
                allPokemons: state.allPokemons.filter(pokemon => pokemon.id !== payload)
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

        case SEARCH_POKEMONS:
            return {
                ...state,
                pokemons: [payload]
            }


        default:
            return {
                ...state
            }
    }
}

export default reducer;