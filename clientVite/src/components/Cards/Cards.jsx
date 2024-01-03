import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filters, orderPokemons, getPokemons, getTypes } from '../../redux/actions';
import Card from '../Card/Card'
import style from "./Cards.module.css"

export default function Cards() {

    // Estados locales
    const pokemonsPerPage = 12;
    const [minRenderedPokemon, setMinRenderedPokemon] = useState(0);
    const [maxRenderedPokemon, setMaxRenderedPokemon] = useState(pokemonsPerPage);
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsLoadingComplete, setPokemonsLoadingComplete] = useState(true);

    // Estados globales
    const selectedPokemons = useSelector(state => state.pokemons);
    const allPokemons = useSelector(state => state.allPokemons);
    const renderedPokemons = selectedPokemons.slice(minRenderedPokemon, maxRenderedPokemon);
    const nextRenderedPokemon = useSelector(state => state.pokemons).slice(maxRenderedPokemon);
    const types = useSelector(state => state.types);
    const typeFilter = useSelector(state => state.typeFilter);
    const originFilter = useSelector(state => state.originFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const attackOrder = useSelector(state => state.attackOrder);
    const searchAux = useSelector(state => state.searchAux);

    // Creo un objeto para enviar al reducer los dos filtros juntos y que puedan ser acumulativos
    const [filter, setFilter] = useState({
        typeFilter: typeFilter,
        originFilter: originFilter,
    });

    // Creo un objeto para enviar al reducer los ordenamientos
    const [order, setOrder] = useState({
        nameOrder: nameOrder,
        attackOrder: attackOrder
    })

    const dispatch = useDispatch();
    
    // Variable auxiliar para habilitar los filtros, que utilizo en el useEffect
    let loadNum = 0;
    
    useEffect(() => {
        console.log(1)
        // Si estoy en una página distinta a la primera y busco un Pokemon:
        if(searchAux) {
            console.log(2)
            setMinRenderedPokemon(0);
            setMaxRenderedPokemon(pokemonsPerPage);
            return setCurrentPage(1);
        }
        // Si no hay Pokemons o filtros cargados y ningún filtro aplicado
        if((!allPokemons.length || !types.length) && (filter.typeFilter === 'all' && filter.originFilter === 'all')) {
            console.log(3)
            setPokemonsLoadingComplete(false);
            dispatch(getTypes());
            const downloadedPokemons = dispatch(getPokemons());
            // Habilito los filtros una vez que cargaron los Pokemons
            downloadedPokemons.then(() => {
                console.log(4)
                // Este bloque de código se ejecuta 2 veces:
                // 1) Cuando se resuelve la promesa donwloadedPokemons
                // 2) Cuando terminan de cargarse todos los Pokemons -> Acá quiero que se habiliten los filtros
                loadNum ++; 
                loadNum === 2 && setPokemonsLoadingComplete(true);
            })
        }
        console.log(5)
        dispatch(filters(filter));
        dispatch(orderPokemons(order));
    }, [filter, order, searchAux])


    function handleFilters(event) {
        setFilter({...filter, [event.target.name]: event.target.value});
        setCurrentPage(1);
        setMinRenderedPokemon(0);
        setMaxRenderedPokemon(pokemonsPerPage);
    }

    function handleNameOrder(event) {
        setOrder({
            nameOrder: event.target.value,
            attackOrder: 'none'
        })
    }

    function handleAttackOrder(event) {
        setOrder({
            nameOrder: 'none',
            attackOrder: event.target.value
        })
    }

    function handleCleanFilters(event) {
        // Botón Clean filters
        setFilter({typeFilter: 'all', originFilter: 'all'});
        setOrder({nameOrder: 'none', attackOrder: 'none'});
        setCurrentPage(1);
        setMinRenderedPokemon(0);
        setMaxRenderedPokemon(pokemonsPerPage);

        // Botón Show all
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
                <select name="typeFilter" id="typeFilter" value={typeFilter} onChange={handleFilters} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    {/* Creo una opción para mostrar todos */}
                    <option value="all" key='allNames'>All</option>
                    {/* Despliego todos los types que traje de la DB */}
                    {types.map(type => <option key={type.id} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>)}
                </select>
            </div>

            {/* Filtro por origen */}
            <div>
                <label htmlFor="originFilter">Origin: </label>
                <select name="originFilter" id="originFilter" value={originFilter} onChange={handleFilters} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    <option value="all" key='allOrigins'>All</option>
                    <option value="API" key='API'>API</option>
                    <option value="DB" key='DB'>Database</option>
                </select>
            </div>

            {/* Orden por nombre */}
            <div>
                <label htmlFor="nameOrder">Order by Name: </label>
                <select name="nameOrder" id="nameOrder" value={nameOrder} onChange={handleNameOrder} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
                    <option value="none" key='nameNone'></option>
                    <option value="A" key='nameA'>Ascendant</option>
                    <option value="D" key='nameD'>Descendant</option>
                </select>
            </div>


            {/* Orden por ataque */}
            <div>
                <label htmlFor="attackOrder">Order by Attack: </label>
                <select name="attackOrder" id="attackOrder" value={attackOrder} onChange={handleAttackOrder} disabled={searchAux || !pokemonsLoadingComplete} className={style.select}>
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