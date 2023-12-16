import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { typeFilter, originFilter, nameOrder, attackOrder, getPokemons, getTypes } from '../../redux/actions';
import Card from '../Card/Card'
import style from "./Cards.module.css"

export default function Cards() {

    const [aux, setAux] = useState(false); // Necesario para que se vuelva a renderizar el componente cuando hago un ordenamiento
    const [aux2, setAux2] = useState(false); // Necesario para que se vuelva a renderizar el componente cuando quito los filtros

    const addedPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);

    // En caso que no venga desde la Landing o no hayan terminado de cargar la información en la Landing:
    useEffect(() => {
        if(!addedPokemons.length <=1 || !types.length) {
            dispatch(getTypes());
            dispatch(getPokemons());
        }
    }, [aux2])

    const dispatch = useDispatch();

    function handleTypeFilter(event) {
        dispatch(typeFilter(event.target.value));
    }

    function handleOriginFilter(event) {
        dispatch(originFilter(event.target.value));
    }

    function handleNameOrder(event) {
        if(event.target.value === 'none') {
            dispatch(nameOrder(''));
            aux ? setAux(false) : setAux(true);
        }
        else {
            dispatch(nameOrder(event.target.value));
            aux ? setAux(false) : setAux(true);
        }
    }

    function handleAttackOrder(event) {
        dispatch(attackOrder(event.target.value));
        aux ? setAux(false) : setAux(true);
    }

    function handleCleanFilters(event) {
        document.getElementById('typeFilter').value = 'all';
        document.getElementById('originFilter').value = 'all';
        document.getElementById('nameOrder').value = '';
        document.getElementById('attackOrder').value = '';
        aux2 ? setAux2(false) : setAux2(true);
    }

    return <div>
        {/* Filtro por type */}
        <label htmlFor="typeFilter">Filter by type:</label>
        <select name="typeFilter" id="typeFilter" onChange={handleTypeFilter}>
            {/* Creo una opción para mostrar todos */}
            <option value="all" key='allNames'>All</option>
            {/* Despliego todos los types que traje de la DB */}
            {types.map(type => <option key={type.id} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>)}
        </select>

        {/* Filtro por origen */}
        <label htmlFor="originFilter">Filter by data origin</label>
        <select name="originFilter" id="originFilter" onChange={handleOriginFilter}>
            <option value="all" key='allOrigins'>All</option>
            <option value="API" key='API'>API</option>
            <option value="DB" key='DB'>Database</option>
        </select>

        {/* Orden por nombre */}
        <label htmlFor="nameOrder">Order by Name</label>
        <select name="nameOrder" id="nameOrder" onChange={handleNameOrder}>
            <option value="none" key='nameNone'></option>
            <option value="A" key='nameA'>Ascendant</option>
            <option value="D" key='nameD'>Descendant</option>
        </select>

        {/* Orden por ataque */}
        <label htmlFor="attackOrder">Order by Attack</label>
        <select name="attackOrder" id="attackOrder" onChange={handleAttackOrder}>
            <option value="none" key='attackNone'></option>
            <option value="A" key='attackA'>Ascendant</option>
            <option value="D" key='attackD'>Descendant</option>
        </select>

        {/* Hacen lo mismo, pero lo separo por un tema de UX. Pensar si es lo mejor */}
        <button onClick={handleCleanFilters}>Clean filters</button>
        <br />
        <button onClick={handleCleanFilters}>Show all</button>

        <div className={style.cards} >
            {/* Mostrar las cards */}
            {addedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
    </div>
}