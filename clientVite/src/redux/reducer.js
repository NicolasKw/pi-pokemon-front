    import { GET_POKEMONS, GET_TYPES, ADD_POKEMON, DELETE_POKEMON, FILTERS, ORDER_POKEMONS, SEARCH_POKEMONS} from './actionsTypes';

    const initialState = {
        pokemons: [],
        allPokemons: [],
        types: [],
        typeFilter: 'all',
        originFilter: 'all',
        nameOrder: 'none',
        attackOrder: 'none',
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
                        originFilter: 'API',
                        typeFilter: payload.typeFilter,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter) && (typeof pokemon.id === 'number')
                            else return (typeof pokemon.id === 'number')
                        })
                    }
                } else if(payload.originFilter === 'DB') {
                    return {
                        ...state,
                        originFilter: 'DB',
                        typeFilter: payload.typeFilter,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter) && (typeof pokemon.id !== 'number')
                            else return (typeof pokemon.id !== 'number')
                        })
                    }
                } else {
                    return {
                        ...state,
                        originFilter: '',
                        typeFilter: payload.typeFilter,
                        pokemons: state.allPokemons.filter(pokemon => {
                            if(payload.typeFilter !== 'all') return pokemon.typesNames.includes(payload.typeFilter)
                            else return pokemon.typesNames
                        })
                }
            }

            case ORDER_POKEMONS:
                if(payload.nameOrder !== 'none') {
                    if(payload.nameOrder === 'A') {
                        return {
                            ...state,
                            nameOrder: payload.nameOrder,
                            attackOrder: 'none',
                            pokemons: state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
                        }
                    } else if(payload.nameOrder === 'D') {
                        return {
                            ...state,
                            nameOrder: payload.nameOrder,
                            attackOrder: 'none',
                            pokemons: state.pokemons.sort((a, b) => b.name.localeCompare(a.name))
                        }
                }
                } else if (payload.attackOrder !== 'none') {
                    if(payload.attackOrder === 'A') {
                        return {
                            ...state,
                            attackOrder: payload.attackOrder,
                            nameOrder: 'none',
                            pokemons: state.pokemons.sort((a, b) => a.attack - b.attack)
                        }
                    } else if(payload.attackOrder === 'D') {
                        return {
                        ...state,
                        attackOrder: payload.attackOrder,
                        nameOrder: 'none',
                        pokemons: state.pokemons.sort((a, b) => b.attack - a.attack)}
                }
                } else return {
                    ...state,
                    nameOrder: 'none',
                    attackOrder: 'none',
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