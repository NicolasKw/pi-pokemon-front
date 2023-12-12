import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { typeFilter, originFilter, nameOrder, attackOrder } from '../redux/actions';
import Card from './Card'

export default function Cards() {

    const addedPokemons = useSelector(state => state.pokemons);

    const [types, setTypes] = useState([]);
    
    const dispatch = useDispatch();

    // Traigo todos los types de la DB
    useEffect(() => {
        const downloadData = async() => {
            try {
                const { data } = await axios('http://localhost:3001/types');
                const typesNames = data.map(elem => elem.name);
                setTypes(typesNames);
            } catch (error) {
                console.log(error);
            }
        }
        downloadData();
    }, []);


    function handleTypeFilter(event) {
        dispatch(typeFilter(event.target.value));
    }

    function handleOriginFilter(event) {
        dispatch(originFilter(event.target.value));
    }

    function handleNameOrder(event) {
        dispatch(nameOrder(event.target.value));
    }

    function handleAttackOrder(event) {
        dispatch(attackOrder(event.target.value))
    }


    return <div>
        {/* Filtro por type */}
        <label htmlFor="typeFilter">Filter by type:</label>
        <select name="typeFilter" id="typeFilter" onChange={handleTypeFilter}>
            {/* Creo una opción para mostrar todos */}
            <option key='all' value="all">All</option>
            {/* Despliego todos los types que traje de la DB */}
            {types.map(type => <option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</option>)}
        </select>

        {/* Filtro por origen */}
        <label htmlFor="originFilter">Filter by data origin</label>
        <select name="originFilter" id="originFilter" onChange={handleOriginFilter}>
            <option value="all">All</option>
            <option value="API">API</option>
            <option value="DB">Database</option>
        </select>

        {/* Orden por nombre */}
        <label htmlFor="nameOrder">Order by Name</label>
        <select name="nameOrder" id="nameOrder" onChange={handleNameOrder}>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
        </select>

        {/* Orden por ataque */}
        <label htmlFor="attackOrder">Order by Attack</label>
        <select name="attackOrder" id="attackOrder" onChange={handleAttackOrder}>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
        </select>

        {/* Mostrar las cards */}
        {addedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
    </div>
}