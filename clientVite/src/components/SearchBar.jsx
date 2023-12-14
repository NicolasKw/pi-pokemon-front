import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemons, getPokemons } from "../redux/actions";

export default function SearchBar() {

    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setName(event.target.value);
    }
    
    const searchPokemon = async () => {
        // Si no introduce ningún nombre
        if(!name) return alert('Please write a valid Pokemon name');
        dispatch(searchPokemons(name));
       
        setName('');
    }

    const showAll = () => {
        dispatch(getPokemons());
    }

    return <div>
        <input type="text" id="searchBar" placeholder="Write the Pokemon name" autoComplete="off" onChange={handleChange} value={name} />
        <button onClick={searchPokemon} >Search</button>
        <button onClick={showAll}>Show all</button>
    </div>
}