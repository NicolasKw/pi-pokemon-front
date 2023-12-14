import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";

export default function SearchBar() {

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const addedPokemons = useSelector(state => state.pokemons);

    const handleChange = (event) => {
        setName(event.target.value);
    }
    
    const searchPokemon = async () => {
        // Si no introduce ningún nombre
        if(!name) return alert('Please write a valid Pokemon name');

        // Chequeo si el Pokemón buscado ya se encuentra agregado
        let repeated = false;
        addedPokemons.forEach(pokemon => pokemon.name === name && (repeated = true));
        
        // Si  ya se encuentra agregado:
        if(repeated) return alert(`${name} has been added already`);
        
        // Si no se encuentra agregado
        else {

            // Chequeo si existe un Pokemon con el nombre buscado
            try {
                const URL_BASE = 'http://localhost:3001/pokemons/?name='
                await axios(`${URL_BASE}${name}`)
            } catch (error) {
                return alert(`Pokemon with name ${name} not found`)
            }

            // Agrego el Pokemon buscado
            dispatch(getPokemons(name));
            setName('');
        }       
    }

    return <div>
        <input type="text" id="searchBar" placeholder="Write the Pokemon name" onChange={handleChange} value={name} />
        <button onClick={searchPokemon} >Search</button>
    </div>
}