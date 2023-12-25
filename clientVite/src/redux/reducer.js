    import { GET_POKEMONS, GET_TYPES, DELETE_POKEMON, FILTERS, NAME_ORDER, ATTACK_ORDER, ADD_POKEMON, SEARCH_POKEMONS} from './actionsTypes';

    const initialState = {
        pokemons: [],
        allPokemons: [],
        types: [],
        searchAux: false
    }

    function reducer(state = initialState, { type, payload }) {
        switch(type) {

            case GET_POKEMONS:
                return {
                    ...state, 
                    pokemons: payload,
                    allPokemons: payload,
                    searchAux: false
                }

            case GET_TYPES:
                return {
                    ...state,
                    types: payload,
                    searchAux: false
                }

            case ADD_POKEMON:
                return {
                    ...state,
                    pokemons: [...state.pokemons, payload],
                    allPokemons: [...state.allPokemons, payload],
                    searchAux: false
                }

            case DELETE_POKEMON:
                return {
                    ...state,
                    pokemons: state.pokemons.filter(pokemon => pokemon.id !== payload),
                    allPokemons: state.allPokemons.filter(pokemon => pokemon.id !== payload),
                    searchAux: false
                }

            case FILTERS:
                if(payload.originFilter === 'API'){
                    return {
                        ...state,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter) && (typeof pokemon.id === 'number')
                            else return (typeof pokemon.id === 'number')
                        })
                    }
                } else if(payload.originFilter === 'DB') {
                    return {
                        ...state,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter) && (typeof pokemon.id !== 'number')
                            else return (typeof pokemon.id !== 'number')
                        })
                    }
                } else {
                    return {
                        ...state,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter)
                            else return pokemon.typesNames
                        })
                }
            }
            
            case NAME_ORDER:
                if(payload === 'A') {
                    return {
                        ...state,
                        pokemons: state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
                    }
                } else if(payload === 'D') {
                    return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => b.name.localeCompare(a.name))}
                } else return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.id - b.id)
                }
            
            case ATTACK_ORDER:
                if(payload === 'A') {
                    return {
                        ...state,
                        pokemons: state.pokemons.sort((a, b) => a.attack - b.attack)}
                } else if(payload === 'D') {
                    return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => b.attack - a.attack)}
                } else return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.id - b.id)
                }

            case SEARCH_POKEMONS:
                return {
                    ...state,
                    pokemons: [payload],
                    searchAux: true
                }

            default:
                return {
                    ...state
                }
        }
    }

    export default reducer;