import { useDispatch } from "react-redux";
import { deletePokemon } from "../../redux/actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({pokemon}) {
    
    const { id, name, typesNames, imageClassic, image3d, imageArtistic } = pokemon;

    const [image, setImage] = useState('');
    
    const dispatch = useDispatch();

    // Para los Pokemons de la DB
    const closePokemon = () => {
        const confirmation = confirm(`Are you sure you want to delete Pokemon "${name[0].toUpperCase() + name.slice(1)}"?`)
        confirmation && dispatch(deletePokemon(id));
    }

    // Imagen de 'No Image Available'
    const noImage = 'https://vignette.wikia.nocookie.net/hanabira/images/6/60/No_Image_Available.png/revision/latest?cb=20180619160503'
    
    // Carrousel de imágenes
    const changeImage = (event) => {
        
        const imagesArray = [];

        imageClassic && imagesArray.push(imageClassic)
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

    return <div className={style.div} >
        
        <Link to={`/detail/${id}`}>
            <h3 className={style.title}>
                {name[0].toUpperCase() + name.slice(1)}
            </h3>
        </Link>

        {/* Botón de delete para Pokemons de la DB, fuera de Link */}
        {typeof pokemon.id !== 'number' && <button onClick={closePokemon} title="Delete" className={style.deleteButton}><img src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png" alt="delete" width='15em'/></button>}
        
        <Link to={`/detail/${id}`}><h3 className={style.types}>{'Types: '}
                {typesNames.map(type => type[0].toUpperCase() + type.slice(1)).join(', ')}
            </h3>
            <div className={style.imageContainer}>
                <img src={!image ? (imageClassic || image3d || imageArtistic || noImage) : image} alt="pokemonImage" width='180px' height='180px' className={style.image}/>
            </div>
        </Link>   
        
        {/* Botones para cambiar de imagen */}
        <div className={style.buttonsDiv}>
            <button onClick={changeImage} value='<' disabled={(!imageClassic && !image3d) || (!imageClassic && !imageArtistic) || (!image3d && !imageArtistic)} className={style.imageButton}>{'<'}</button>
            <button onClick={changeImage} value='>' disabled={(!imageClassic && !image3d) || (!imageClassic && !imageArtistic) || (!image3d && !imageArtistic)} className={style.imageButton}>{'>'}</button>
        </div>
        
    </div>
}