import { GET_POKEMONS, GET_TYPES, ADD_POKEMON, DELETE_POKEMON, ORIGIN_FILTER, TYPE_FILTER, NAME_ORDER, ATTACK_ORDER } from "./actionsTypes";
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

export function typeFilter(typeName) {
    return {
        type: TYPE_FILTER,
        payload: typeName
    }
}

export function originFilter(origin) {
    return {
        type: ORIGIN_FILTER,
        payload: origin
    }
}

export function nameOrder(orderBy) {
    return {
        type: NAME_ORDER,
        payload: orderBy
    }
}

export function attackOrder(orderBy) {
    return {
        type: ATTACK_ORDER,
        payload: orderBy
    }
}