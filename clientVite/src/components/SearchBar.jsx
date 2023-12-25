import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemons } from "../redux/actions";

export default function SearchBar() {

    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setName(event.target.value);
    }
    
    const searchPokemon = async () => {
        // Si no introduce ningún nombre
        if(!name) return alert('Please write a valid Pokemon name');

        //! Se podría mejorar? Para no hacer 2 llamados al servidor (uno acá y uno en actions.js)
        try {
            dispatch(searchPokemons(name)); //! Pongo el dispatch primero para que tarde menos en cargar la búsqueda
            await axios(`http://localhost:3001/pokemons/name?name=${name}`)
        } catch (error) {
            alert(`Pokemon with name ${name[0].toUpperCase() + name.slice(1)} not found`)   
        }
       
        setName('');
    }

    //! Lo pasé a Cards
    // const showAll = () => {
    //     dispatch(getPokemons());
    // }

    return <div>
        <input type="text" id="searchBar" placeholder="Write the Pokemon name" autoComplete="off" onChange={handleChange} value={name} />
        <button onClick={searchPokemon}>Search</button>
        {/* <button onClick={showAll}>Show all</button> */}
    </div>
}