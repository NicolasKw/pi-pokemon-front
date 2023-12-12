import { useSelector } from 'react-redux';
import Card from './Card'

export default function Cards() {

    const addedPokemons = useSelector(state => state.pokemons);

    return <div>
        {addedPokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
    </div>
}