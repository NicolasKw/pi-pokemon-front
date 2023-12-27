import { useDispatch } from "react-redux";
import { deletePokemon } from "../../redux/actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({pokemon}) {
    
    const { id, name, typesNames, imageClassic, image3d, imageArtistic } = pokemon;

    const [image, setImage] = useState('');
    
    const dispatch = useDispatch();

    const closePokemon = () => {
        const confirmation = confirm(`Are you sure you want to delete Pokemon "${name[0].toUpperCase() + name.slice(1)}?"`)
        confirmation && dispatch(deletePokemon(id));
    }
    
    const changeImage = (event) => {
        
        const imagesArray = [imageClassic];
        image3d && imagesArray.push(image3d);
        imageArtistic && imagesArray.push(imageArtistic);
        
        let i = 0;
        if(image) i = imagesArray.indexOf(image);

        if(event.target.value === '>') {
            i = (i + 1) % imagesArray.length;
        } else if(event.target.value === '<') {
            i = (i + imagesArray.length - 1) % imagesArray.length;
        }

        console.log(i)
        setImage(imagesArray[i]);
    }

    return <div className={style.div} >

        {/* Botón de delete para Pokemons de la DB */}
        {typeof pokemon.id !== 'number' && <button onClick={closePokemon}>Delete</button>}
        
        <Link to={`/detail/${id}`}>
            <h3 className={style.title}>{name[0].toUpperCase() + name.slice(1)}</h3>
            <h3>Types: 
                <ol>
                    {typesNames.map(type => <li key={type}>{type[0].toUpperCase() + type.slice(1)}</li> )} 
                </ol>
            </h3>
            <div className={style.imageContainer}>
                <img src={!image ? imageClassic : image} alt="pokemonImage" width='200px' height='200px' className={style.image}/>
            </div>
        </Link>   
        
        {/* Botones para cambiar de imagen */}
        <div className={style.buttonsDiv}>
            <button onClick={changeImage} value='<' disabled={!image3d && !imageArtistic} className={style.imageButton}>{'<'}</button>
            <button onClick={changeImage} value='>' disabled={!image3d && !imageArtistic} className={style.imageButton}>{'>'}</button>
        </div>
        
    </div>
}