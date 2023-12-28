import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import style from "./Detail.module.css"

export default function Detail() {

    const { idPokemon } = useParams();

    const [pokemon, setPokemon] = useState({})

    const [image, setImage] = useState('');

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

    
    if(!pokemon.name) {
        return <div><img src="https://p-okedex.vercel.app/static/media/pokeball.2affaaf5.gif" alt="loading" className={style.loading}/></div>
    }
    const { id, name, hp, attack, defense, speed, height, weight, imageClassic, image3d, imageArtistic, typesNames } = pokemon;


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

        setImage(imagesArray[i]);
    }


    return <div>

        <Link to={'/home'}><button className={style.backButton}>← Back</button></Link>

        <div className={style.div}>
            {/* Imágenes */}
            <div className={style.imageContainer}>
                <img src={!image ? imageClassic : image} alt="pokemonImage" width='300em' height='300em' className={style.image}/>
                {/* Botones para cambiar de imagen */}
                <div className={style.buttonsDiv}>
                    <button onClick={changeImage} value='<' disabled={!image3d && !imageArtistic} className={style.imageButton}>{'<'}</button>
                    <button onClick={changeImage} value='>' disabled={!image3d && !imageArtistic} className={style.imageButton}>{'>'}</button>
                </div>
            </div>

            {/* Texto */}
            <div className={style.textContainer}>
                <h2 className={style.h2}>{name[0].toUpperCase() + name.slice(1)}</h2>
                <h3 className={style.h3}>ID</h3>
                <h4 className={style.h4}>{id}</h4>
                <h3 className={style.h3}>HP</h3>
                <h4 className={style.h4}>{hp}</h4>
                <h3 className={style.h3}>Attack</h3>
                <h4 className={style.h4}>{attack}</h4>
                <h3 className={style.h3}>Defense</h3>
                <h4 className={style.h4}>{defense}</h4>
                <h3 className={style.h3}>Speed</h3>
                <h4 className={style.h4}>{speed}</h4>
                <h3 className={style.h3}>Height</h3>
                <h4 className={style.h4}>{height}</h4>
                <h3 className={style.h3}>Weight</h3>
                <h4 className={style.h4}>{weight}</h4>
                <h3 className={style.h3}>Types</h3> 
                    <h4 className={style.h4}>{typesNames.map(type => type[0].toUpperCase() + type.slice(1)).join(', ')}</h4> 
                
            </div>
        </div>

        </div>
}