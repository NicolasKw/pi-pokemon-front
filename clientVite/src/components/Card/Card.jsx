import { useDispatch } from "react-redux";
import { deletePokemon } from "../../redux/actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({pokemon}) {
    
    const { id, name, typesNames, imageClassic, image3d, imageArtistic } = pokemon;

    
    const [image, setImage] = useState(imageClassic);
    
    const dispatch = useDispatch();

    const closePokemon = () => {
        const confirmation = confirm(`Are you sure you want to delete Pokemon "${name[0].toUpperCase() + name.slice(1)}?"`)
        confirmation && dispatch(deletePokemon(id));
    }
    
    const changeImage = (image) => {
        setImage(image);
    }

    return <div className={style.div} >
        <button><Link to={`/detail/${id}`}>Details</Link></button>      
        {typeof pokemon.id !== 'number' && <button onClick={closePokemon}>Delete</button>}
        <h3>Name: {name[0].toUpperCase() + name.slice(1)}</h3>
        <h3>Types: 
            <ol>
                {typesNames.map(type => <li key={type}>{type[0].toUpperCase() + type.slice(1)}</li> )} 
            </ol>
        </h3>
        <img src={image} alt="pokemonImage" width='200px'/>
        <h3>Image: 
            <button onClick={() => changeImage(imageClassic)}>Classic</button>
            {image3d && <button onClick={() => changeImage(image3d)}>3D</button>}
            {imageArtistic && <button onClick={() => changeImage(imageArtistic)}>Artistic</button>}
        </h3>
    </div>
}