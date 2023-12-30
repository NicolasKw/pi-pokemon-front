import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filters, nameOrder, attackOrder, getPokemons, getTypes } from '../../redux/actions';
import Card from '../Card/Card'
import style from "./Cards.module.css"

export default function Cards() {

    // Estados locales
    const [aux, setAux] = useState(false); // Necesario para que se vuelva a renderizar el componente cuando hago un ordenamiento
    const pokemonsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1)
    const [minRenderedPokemon, setMinRenderedPokemon] = useState(0);
    const [maxRenderedPokemon, setMaxRenderedPokemon] = useState(pokemonsPerPage);
    const [pokemonsLoadingComplete, setPokemonsLoadingComplete] = useState(true);
    const [filter, setFilter] = useState({
        typeFilter: 'all',
        originFilter: 'all'
    });

    // Estados globales
    const allPokemons = useSelector(state => state.pokemons);
    const renderedPokemons = allPokemons.slice(minRenderedPokemon, maxRenderedPokemon);
    const nextRenderedPokemon = useSelector(state => state.pokemons).slice(maxRenderedPokemon);
    const types = useSelector(state => state.types);
    const searchAux = useSelector(state => state.searchAux);

    const dispatch = useDispatch();
    
    // Variable auxiliar para habilitar los filtros, que utilizo en el useEffect
    let loadNum = 0;
    
    useEffect(() => {
        // Si estoy en una página distinta a la primera y busco un Pokemon:
        if(searchAux) {
            setMinRenderedPokemon(0);
            setMaxRenderedPokemon(pokemonsPerPage);
            return setCurrentPage(1);
        }
        // Si no hay Pokemons o filtros cargados y ningún filtro aplicado
        if((!renderedPokemons.length || !types.length) && (filter.typeFilter === 'all' && filter.originFilter === 'all')) {
            setPokemonsLoadingComplete(false);
            dispatch(getTypes());
            const downloadedPokemons = dispatch(getPokemons());
            // Habilito los filtros una vez que cargaron los Pokemons
            downloadedPokemons.then(() => {
                // Este bloque de código se ejecuta 2 veces:
                // 1) Cuando se resuelve la promesa donwloadedPokemons
                // 2) Cuando terminan de cargarse todos los Pokemons -> Acá quiero que se habiliten los filtros
                loadNum ++; 
                loadNum === 2 && setPokemonsLoadingComplete(true);
            })
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
        document.getElementById('attackOrder').value = '';
    }

    function handleAttackOrder(event) {
        dispatch(attackOrder(event.target.value));
        aux ? setAux(false) : setAux(true);
        document.getElementById('nameOrder').value = '';
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
        if(event.target.value === 'showAll') {
            dispatch(getPokemons());
        }
    }

    function handleChangePage(event) {
        if(event.target.value === 'next') {
            setMinRenderedPokemon(minRenderedPokemon + pokemonsPerPage);
            setMaxRenderedPokemon(maxRenderedPokemon + pokemonsPerPage);
            setCurrentPage(currentPage + 1);
        } else if (event.target.value === 'back') {
            setMinRenderedPokemon(minRenderedPokemon - pokemonsPerPage);
            setMaxRenderedPokemon(maxRenderedPokemon - pokemonsPerPage);
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(1);
            setMinRenderedPokemon(0);
            setMaxRenderedPokemon(pokemonsPerPage);
        }
    }


    return <div>

        {/* Div con filtros */}
        <div className={style.filtersContainer}>

            {/* Hasta que se habilitan los filtros */}
            {(!pokemonsLoadingComplete) && <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="loading" width='25em' className={style.loadingFilters}/> }

            {/* Filtro por type */}
            <div>
                <label htmlFor="typeFilter">Type: </label>
                <select name="typeFilter" id="typeFilter" onChange={handleFilters} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    {/* Creo una opción para mostrar todos */}
                    <option value="all" key='allNames'>All</option>
                    {/* Despliego todos los types que traje de la DB */}
                    {types.map(type => <option key={type.id} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>)}
                </select>
            </div>

            {/* Filtro por origen */}
            <div>
                <label htmlFor="originFilter">Origin: </label>
                <select name="originFilter" id="originFilter" onChange={handleFilters} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    <option value="all" key='allOrigins'>All</option>
                    <option value="API" key='API'>API</option>
                    <option value="DB" key='DB'>Database</option>
                </select>
            </div>

            {/* Orden por nombre */}
            <div>
                <label htmlFor="nameOrder">Order by Name: </label>
                <select name="nameOrder" id="nameOrder" onChange={handleNameOrder} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    <option value="none" key='nameNone'></option>
                    <option value="A" key='nameA'>Ascendant</option>
                    <option value="D" key='nameD'>Descendant</option>
                </select>
            </div>


            {/* Orden por ataque */}
            <div>
                <label htmlFor="attackOrder">Order by Attack: </label>
                <select name="attackOrder" id="attackOrder" onChange={handleAttackOrder} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
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
            <button value='showAll' onClick={handleCleanFilters} disabled={renderedPokemons.length > 1} className={style.button}>Show all</button>
            {/* Paginado */}
            <div>
                <button value='back' onClick={handleChangePage} disabled={currentPage === 1} className={style.button}>{'<'}</button>
                <button className={style.button}>{currentPage}</button>
                <button value='next' onClick={handleChangePage} disabled={!nextRenderedPokemon.length} className={style.button}>{'>'}</button>
            </div>
            {/* Botón para volver a la página inicial */}
            <button value='first' onClick={handleChangePage} disabled={currentPage === 1} className={style.button}>Go to Page 1</button>
        </div>

        {/* Loading message */}
        {(renderedPokemons.length === 0 && filter.typeFilter === 'all' && filter.originFilter === 'all') && <img src="https://p-okedex.vercel.app/static/media/pokeball.2affaaf5.gif" alt="loading" className={style.loading}/>}

        {/* Nothing to show message */}
        {(renderedPokemons.length === 0 && (filter.typeFilter !== 'all' || filter.originFilter !== 'all')) && <h2 className={style.empty}>Oops, looks like there's nothing here<br /><img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlxbm1sbHgyc2NzdGpua3IybmVrazVjbDhpZm96aGNuazIzOGM5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PhZ4hE8XVEoOkWA4db/giphy.gif" alt="empty" width='300em'/></h2> }

        {/* Renderizado de Cards */}
        <div className={style.cards} >
            {/* Mostrar las cards */}
            {renderedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
    </div>
}