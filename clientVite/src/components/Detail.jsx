import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {

    const { idPokemon } = useParams();

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        const downloadData = async() => {
            try {
                const { data } = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                setPokemon(data);
            } catch (error) {
                console.log(error);
            }
        }
        downloadData();
    }, [idPokemon]);
    
    const { id, name, hp, attack, defense, speed, height, weight, imageClassic, image3d, imageArtistic, typesNames } = pokemon;
    
    const [image, setImage] = useState(imageClassic);

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
            <button onClick={() => changeImage(imageClassic)}>Classic</button>
            <button onClick={() => changeImage(image3d)}>3D</button>
            <button onClick={() => changeImage(imageArtistic)}>Artistic</button>
        </h3>
    </div>
}