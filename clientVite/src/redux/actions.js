import { ADD_POKEMON, CREATE_POKEMON, DELETE_POKEMON } from "./actionsTypes";
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