import { GET_POKEMONS, GET_TYPES, ADD_POKEMON, DELETE_POKEMON, FILTERS, ORDER_POKEMONS, SEARCH_POKEMONS } from "./actionsTypes";
import axios from "axios";


export function getPokemons() {

    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/pokemons');

            dispatch({
                type: GET_POKEMONS,
                payload: data
            })
    
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypes() {

    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/types');

            dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function addPokemon(pokemon) {
    return {
        type: ADD_POKEMON,
        payload: pokemon
    }
}

export function deletePokemon(id) {

    return async (dispatch) => {
        try {
            (typeof id !== 'number') && await axios.delete(`http://localhost:3001/pokemons/${id}`)
            
            dispatch ({
                type: DELETE_POKEMON,
                payload: id
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}

export function filters(filters) {
    return {
        type: FILTERS,
        payload: filters
    }
}

export function orderPokemons(orders) {
    return {
        type: ORDER_POKEMONS,
        payload: orders
    }
}

export function searchPokemons(name) {

    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/pokemons/name?name=${name}`);

            dispatch({
                type: SEARCH_POKEMONS,
                payload: data
            })
    
        } catch (error) {
            console.log(error);
        }
    }
}