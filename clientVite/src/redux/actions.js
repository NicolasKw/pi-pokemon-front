import { ADD_POKEMON, CREATE_POKEMON, DELETE_POKEMON, ORIGIN_FILTER, TYPE_FILTER, NAME_ORDER, ATTACK_ORDER } from "./actionsTypes";
import axios from "axios";


export function addPokemon(name) {

    const URL_BASE = 'http://localhost:3001/pokemons/?name=';

    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_BASE}${name}`);

            dispatch({
                type: ADD_POKEMON,
                payload: data
            })
    
        } catch (error) {
            console.log(error);
        }
    }
}

export function deletePokemon(name) {
    return {
        type: DELETE_POKEMON,
        payload: name
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