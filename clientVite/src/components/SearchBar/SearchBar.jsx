import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemons } from "../../redux/actions";
import { useLocation } from "react-router";
import style from "./SearchBar.module.css"

export default function SearchBar() {

    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const handleChange = (event) => {
        setName(event.target.value);
    }
    
    const searchPokemon = async () => {
        // Si no introduce ningún nombre:
        if(!name) return alert('Please write a valid Pokemon name');

        // Si introduce un nombre:
        try {
            dispatch(searchPokemons(name));
            // Verifico que el Pokemon exista. Si no existe, pasa al catch
            await axios(`/pokemons/name?name=${name}`)
        } catch (error) {
            // Si el Pokemon no existe:
            alert(`Pokemon with name ${name[0].toUpperCase() + name.slice(1)} not found`)   
        }
       
        // Reseteo la barra de búsqueda para que quede vacía
        setName('');
    }

    return <div className={style.barContainer}>
        <input type="text" id="searchBar" placeholder="Search Pokemon by name" autoComplete="off" disabled={pathname === '/form' || pathname.includes('/detail')} onChange={handleChange} value={name} className={style.bar}/>
        <div className={style.buttonContainer}>
            <button onClick={searchPokemon} disabled={pathname === '/form'} className={style.button}><img src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-noir.png" alt="search" width='25em'/></button>
        </div>
        {/* <button onClick={showAll}>Show all</button> */}
    </div>
}