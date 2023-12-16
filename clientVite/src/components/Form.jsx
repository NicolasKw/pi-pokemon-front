import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import validation from "./validation";

export default function Form() {

    const types = useSelector(state => state.types)

    const dispatch = useDispatch();
    const navigate = useNavigate()

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

        setErrors(validation({
            ...newPokemon,
            [event.target.name]: event.target.value,
        }))
    }

    const handleCheckbox = (event) => {
        const { checked, value } = event.target;
        
        if(checked) {
            setNewPokemon ({
                ...newPokemon,
                typesNames: [...newPokemon.typesNames, value.toLowerCase()]
            }) 
            setErrors(validation({
                ...newPokemon,
                typesNames: [...newPokemon.typesNames, value]
            }))
        } else {
            setNewPokemon ({
                ...newPokemon,
                typesNames: newPokemon.typesNames.filter(type => type !== value.toLowerCase())
            })
            setErrors(validation({
                ...newPokemon,
                typesNames: newPokemon.typesNames.filter(type => type !== value.toLowerCase())
            }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:3001/pokemons/', newPokemon); // Creo y obtengo el nuevo registro
            dispatch(addPokemon(data)) // Actualizo el estado global
            alert(`Pokemon "${data.name[0].toUpperCase() + data.name.slice(1)}" has been created successfully with ID ${data.id}`);
            navigate('/home') // Redirijo automáticamente a home
        } catch (error) {
            try {
                // Si hay errores de validación
                if(Object.keys(errors).length) alert("Pokemon creation failed: data is missing");
                // Si ya se creó un Pokemon igual previamente
                else {
                    const { data } = await axios(`http://localhost:3001/pokemons/name?name=${newPokemon.name}`);
                    alert(`Pokemon with name "${newPokemon.name[0].toUpperCase() + newPokemon.name.slice(1)}" has been created already`);
                }
            } catch (error) {
                console.log({error});                
            }
        }

        setErrors(validation({
            ...newPokemon,
            typesNames: newPokemon.typesNames
        }))
    }

    // Extraigo todas las validaciones
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
            <input type="submit" value="Create Pokemon" disabled={Object.keys(errors).length}/>
                <span>{nameNotNull}</span>
                <span>{hpNotNull}</span>
                <span>{attackNotNull}</span>
                <span>{defenseNotNull}</span>
                <span>{typesNamesValidation}</span>
                <span>{imageClassicNotNull}</span>                
        </form>
    </div>
}