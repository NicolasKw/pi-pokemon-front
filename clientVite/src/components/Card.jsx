import { useDispatch } from "react-redux";
import { deletePokemon } from "../redux/actions";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({pokemon}) {
    
    const { name, pokemonTypes, imageDreamWorld, imageHome, imageArtwork } = pokemon;

    const typesNames = pokemonTypes.map(elem => elem.name);

    const dispatch = useDispatch();
    const closePokemon = () => {
        dispatch(deletePokemon(name));
    }
    
    const [image, setImage] = useState(imageDreamWorld);
    const changeImage = (image) => {
        setImage(image);
    }

    return <div>
        <button onClick={closePokemon}>X</button>
        {/* <h3>ID: {id}</h3> */}
        <h3>Name: {name[0].toUpperCase() + name.slice(1)}</h3>
        {/* <h3>HP: {hp}</h3> */}
        {/* <h3>Attack: {attack}</h3> */}
        {/* <h3>Defense: {defense}</h3> */}
        {/* <h3>Speed: {speed}</h3> */}
        {/* <h3>Height: {height}</h3> */}
        {/* <h3>Weight: {weight}</h3> */}
        <h3>Types: 
            <ol>
                {typesNames.map(type => <li key={type}> {type[0].toUpperCase() + type.slice(1)} </li> )} 
            </ol>
        </h3>
        <img src={image} alt="pokemonImage" width='200px'/>
        <h3>Image: 
            <button onClick={() => changeImage(imageDreamWorld)}>Dream World</button>
            <button onClick={() => changeImage(imageHome)}>Home</button>
            <button onClick={() => changeImage(imageArtwork)}>Artwork</button>
        </h3>
        <Link to={`/detail/${name}`} pokemon={pokemon}><h3><button>Details</button></h3></Link>        
    </div>
}