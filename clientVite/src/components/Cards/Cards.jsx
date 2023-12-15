import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { typeFilter, originFilter, nameOrder, attackOrder, getPokemons, getTypes } from '../../redux/actions';
import Card from '../Card/Card'
import style from "./Cards.module.css"

export default function Cards() {

    const [aux, setAux] = useState(false); // Necesario para que se vuelva a renderizar el componente cuando hago un ordenamiento

    const addedPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);

    // En caso que no venga desde la Landing o no hayan terminado de cargar la información en la Landing:
    useEffect(() => {
        if(!addedPokemons.length || !types.length) {
            dispatch(getTypes());
            dispatch(getPokemons());
        }
    }, [addedPokemons])

    const dispatch = useDispatch();

    function handleTypeFilter(event) {
        dispatch(typeFilter(event.target.value));
    }

    function handleOriginFilter(event) {
        dispatch(originFilter(event.target.value));
    }

    function handleNameOrder(event) {
        dispatch(nameOrder(event.target.value));
        aux ? setAux(false) : setAux(true);
    }

    function handleAttackOrder(event) {
        dispatch(attackOrder(event.target.value));
        aux ? setAux(false) : setAux(true);
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
            <option value="A" key='nameA'>Ascendant</option>
            <option value="D" key='nameD'>Descendant</option>
        </select>

        {/* Orden por ataque */}
        <label htmlFor="attackOrder">Order by Attack</label>
        <select name="attackOrder" id="attackOrder" onChange={handleAttackOrder}>
            <option value="A" key='attackA'>Ascendant</option>
            <option value="D" key='attackD'>Descendant</option>
        </select>

        <div className={style.cards} >
            {/* Mostrar las cards */}
            {addedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
    </div>
}