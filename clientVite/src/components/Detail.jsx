import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {

    const { pokemonName } = useParams();

    const addedPokemons = useSelector(state => state.pokemons);

    const selectedPokemon = addedPokemons.find(pokemon => pokemon.name === pokemonName)
    
    //! ENTENDER POR QUÉ DE ESTA FORMA NO FUNCIONÓ
    // useEffect(() => {
    //     const downloadData = async() => {
    //         try {
    //             const { data } = await axios(`http://localhost:3001/pokemons/?name=${pokemonName}`);
    //             setPokemon(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     downloadData();
    // }, [pokemonName]);
    
    const { id, name, hp, attack, defense, speed, height, weight, pokemonTypes, imageDreamWorld, imageHome, imageArtwork } = selectedPokemon;
    
    const typesNames = pokemonTypes.map(elem => elem.name);

    const [image, setImage] = useState(imageDreamWorld);

    const changeImage = (image) => {
        setImage(image);
    }

    return <div>
        <h3>ID: {id}</h3>
        <h3>Name: {name[0].toUpperCase() + name.slice(1)}</h3>
        <h3>HP: {hp}</h3>
        <h3>Attack: {attack}</h3>
        <h3>Defense: {defense}</h3>
        <h3>Speed: {speed}</h3>
        <h3>Height: {height}</h3>
        <h3>Weight: {weight}</h3>
        <h3>Types: 
            <ol>
                {typesNames.map(type => <li key={type}> {type[0].toUpperCase() + type.slice(1)} </li> )} 
            </ol>
        </h3>
        <img src={image} alt="pokemonImage" width='200px'/>
        <h3>Image: 
            <button onClick={() => changeImage(imageDreamWorld)}>Classic</button>
            <button onClick={() => changeImage(imageHome)}>3D</button>
            <button onClick={() => changeImage(imageArtwork)}>Artistic</button>
        </h3>
    </div>
}