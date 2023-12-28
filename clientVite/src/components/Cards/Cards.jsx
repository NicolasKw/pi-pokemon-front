import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filters, nameOrder, attackOrder, getPokemons, getTypes } from '../../redux/actions';
import Card from '../Card/Card'
import style from "./Cards.module.css"

export default function Cards() {

    const [aux, setAux] = useState(false); // Necesario para que se vuelva a renderizar el componente cuando hago un ordenamiento

    const pokemonsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1)
    const [minRenderedPokemon, setMinRenderedPokemon] = useState(0);
    const [maxRenderedPokemon, setMaxRenderedPokemon] = useState(pokemonsPerPage);

    const renderedPokemons = useSelector(state => state.pokemons).slice(minRenderedPokemon, maxRenderedPokemon);
    const nextRenderedPokemon = useSelector(state => state.pokemons).slice(maxRenderedPokemon);
    const types = useSelector(state => state.types);
    const searchAux = useSelector(state => state.searchAux)

    const [filter, setFilter] = useState({
        typeFilter: 'all',
        originFilter: 'all'
    });

    const dispatch = useDispatch();

    useEffect(() => {
        // Si estoy en una página distinta a la primera y busco un Pokemon:
        if(searchAux) {
            setMinRenderedPokemon(0);
            setMaxRenderedPokemon(pokemonsPerPage);
            return setCurrentPage(1);
        }
        // Si no hay Pokemons o filtros cargados y ningún filtro aplicado
        if((!renderedPokemons.length || !types.length) && (filter.typeFilter === 'all' && filter.originFilter === 'all')) {
            dispatch(getTypes());
            dispatch(getPokemons());
        }
        dispatch(filters(filter));
    }, [filter, searchAux])


    function handleFilters(event) {
        setFilter({...filter, [event.target.name]: event.target.value});
        setCurrentPage(1);
        setMinRenderedPokemon(0);
        setMaxRenderedPokemon(pokemonsPerPage);
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
        setFilter({typeFilter: 'all', originFilter: 'all'});
        setCurrentPage(1);
        setMinRenderedPokemon(0);
        setMaxRenderedPokemon(pokemonsPerPage);
        dispatch(getPokemons());
    }

    function handleChangePage(event) {
        if(event.target.value === 'next') {
            setMinRenderedPokemon(minRenderedPokemon + pokemonsPerPage);
            setMaxRenderedPokemon(maxRenderedPokemon + pokemonsPerPage);
            setCurrentPage(currentPage + 1)
        } else {
            setMinRenderedPokemon(minRenderedPokemon - pokemonsPerPage);
            setMaxRenderedPokemon(maxRenderedPokemon - pokemonsPerPage);
            setCurrentPage(currentPage - 1)
        }
    }

    return <div>

        {/* Div con filtros */}
        <div className={style.filtersContainer}>

            {/* Filtro por type */}
            <div>
                <label htmlFor="typeFilter">Type: </label>
                <select name="typeFilter" id="typeFilter" onChange={handleFilters} disabled={searchAux} className={style.select}>
                    {/* Creo una opción para mostrar todos */}
                    <option value="all" key='allNames'>All</option>
                    {/* Despliego todos los types que traje de la DB */}
                    {types.map(type => <option key={type.id} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>)}
                </select>
            </div>

            {/* Filtro por origen */}
            <div>
                <label htmlFor="originFilter">Origin: </label>
                <select name="originFilter" id="originFilter" onChange={handleFilters} disabled={searchAux} className={style.select}>
                    <option value="all" key='allOrigins'>All</option>
                    <option value="API" key='API'>API</option>
                    <option value="DB" key='DB'>Database</option>
                </select>
            </div>

            {/* Orden por nombre */}
            <div>
                <label htmlFor="nameOrder">Order by Name: </label>
                <select name="nameOrder" id="nameOrder" onChange={handleNameOrder} disabled={searchAux} className={style.select}>
                    <option value="none" key='nameNone'></option>
                    <option value="A" key='nameA'>Ascendant</option>
                    <option value="D" key='nameD'>Descendant</option>
                </select>
            </div>


            {/* Orden por ataque */}
            <div>
                <label htmlFor="attackOrder">Order by Attack: </label>
                <select name="attackOrder" id="attackOrder" onChange={handleAttackOrder} disabled={searchAux} className={style.select}>
                    <option value="none" key='attackNone'></option>
                    <option value="A" key='attackA'>Ascendant</option>
                    <option value="D" key='attackD'>Descendant</option>
                </select>
            </div>

            {/* Botón para resetear filtros */}
            <div>
                <button onClick={handleCleanFilters} disabled={filter.typeFilter === 'all' && filter.originFilter === 'all'} className={style.button}>Clean filters</button>
            </div>

        </div>

        {/* Control de paginado */}
        <div className={style.paginado}>
            {/* Botón para mostrar todos después de buscar */}
            <div>
                <button onClick={handleCleanFilters} disabled={renderedPokemons.length > 1} className={style.button}>Show all</button>
            </div>
            {/* Paginado */}
            <div>
                <button value='back' onClick={handleChangePage} disabled={currentPage === 1} className={style.button}>{'<'}</button>
                <button className={style.button}>{currentPage}</button>
                <button value='next' onClick={handleChangePage} disabled={!nextRenderedPokemon.length} className={style.button}>{'>'}</button>
            </div>
        </div>

        {/* Loading message */}
        {renderedPokemons.length === 0 && <h2><img src="https://p-okedex.vercel.app/static/media/pokeball.2affaaf5.gif" alt="loading" className={style.loading}/></h2>}

        {/* Renderizado de Cards */}
        <div className={style.cards} >
            {/* Mostrar las cards */}
            {renderedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
    </div>
}