import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../redux/actions";
import validation from "./validation";

export default function Form() {

    const types = useSelector(state => state.types)

    const dispatch = useDispatch();

    const [newPokemon, setNewPokemon] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        typesNames: [],
        imageClassic: '',
        image3d: '',
        imageArtistic: ''
    })

    const [errors , setErrors] = useState({});

    // En caso que no se haya cargado previamente la data de types
    useEffect(() => {
        if(!types.length) {
            dispatch(getTypes());
        }
    }, [])

    const handleChange = (event) => {
        setNewPokemon({
            ...newPokemon,
            [event.target.name]: event.target.value.toLowerCase()
        })
    }

    const handleCheckbox = (event) => {
        const { checked, value } = event.target;
        
        if(checked) {
            setNewPokemon ({
                ...newPokemon,
                typesNames: [...newPokemon.typesNames, value.toLowerCase()]
            }) 
        } else {
            setNewPokemon ({
                ...newPokemon,
                typesNames: newPokemon.typesNames.filter(type => type !== value.toLowerCase())
            })
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3001/pokemons/', newPokemon); // Creo y obtengo el nuevo registro
            dispatch(addPokemon(data)) // Actualizo el estado global
            alert(`Pokemon "${data.name[0].toUpperCase() + data.name.slice(1)}" has been created successfully with ID ${data.id}`);
        } catch (error) {
            alert("Pokemon has not been created")
            console.log(error);           
        }

        setErrors(validation({
            ...newPokemon,
            [event.target.name]: event.target.value,
            typesNames: newPokemon.typesNames
        }))
    }

    const { 
        nameValidation,
        nameNotNull,
        hpValidation, 
        hpNotNull,
        attackValidation, 
        attackNotNull,
        defenseValidation, 
        defenseNotNull,
        speedValidation, 
        heightValidation, 
        weightValidation,
        typesNamesValidation,
        imageClassicValidation,
        imageClassicNotNull,
        image3dValidation,
        imageArtisticValidation } = errors;

    return <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name*" value={newPokemon.name} name="name" autoComplete="off" onChange={handleChange}/><br />
                <span>{nameValidation}</span>
            <input type="number" placeholder="HP*" value={newPokemon.hp} name="hp" onChange={handleChange}/><br />
                <span>{hpValidation}</span>
            <input type="number" placeholder="Attack*" value={newPokemon.attack} name="attack" onChange={handleChange}/><br />
                <span>{attackValidation}</span>
            <input type="number" placeholder="Defense*" value={newPokemon.defense} name="defense" onChange={handleChange}/><br />
                <span>{defenseValidation}</span>
            <input type="number" placeholder="Speed" value={newPokemon.speed} name="speed" onChange={handleChange}/><br />
                <span>{speedValidation}</span>
            <input type="number" placeholder="Height" value={newPokemon.height} name="height" onChange={handleChange}/><br />
                <span>{heightValidation}</span>
            <input type="number" placeholder="Weight" value={newPokemon.weight} name="weight" onChange={handleChange}/><br />
                <span>{weightValidation}</span>
            <fieldset>
                <legend>Choose your Pokemon's types*</legend>
                {types.map(type => { 
                    return <div key={type.id}>
                        <input type="checkbox" id={type.id} name="types" value={type.name} onChange={handleCheckbox}/>
                        <label htmlFor={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</label> 
                    </div>
                })}
            </fieldset>
            <input type="url" placeholder="Classic image URL*" value={newPokemon.imageClassic} name="imageClassic" onChange={handleChange}/><br />
                <span>{imageClassicValidation}</span>
            <input type="url" placeholder="3D image URL" value={newPokemon.image3d} name="image3d" onChange={handleChange}/><br />
                <span>{image3dValidation}</span>
            <input type="url" placeholder="Artistic image URL" value={newPokemon.imageArtistic} name="imageArtistic" onChange={handleChange}/><br />
                <span>{imageArtisticValidation}</span>
            <input type="submit" value="Create Pokemon"/>
                <span>{nameNotNull}</span>
                <span>{hpNotNull}</span>
                <span>{attackNotNull}</span>
                <span>{defenseNotNull}</span>
                <span>{typesNamesValidation}</span>
                <span>{imageClassicNotNull}</span>                
        </form>
    </div>
}