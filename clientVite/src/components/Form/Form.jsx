import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import validation from "../validation";
import style from "./Form.module.css";

export default function Form() {

    const types = useSelector(state => state.types)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Creo una variable local donde voy a guardar toda la data ingresada por el usuario
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
        
        // Si tilda la casilla
        if(checked) {
            setNewPokemon ({
                ...newPokemon,
                typesNames: [...newPokemon.typesNames, value.toLowerCase()]
            }) 
            setErrors(validation({
                ...newPokemon,
                typesNames: [...newPokemon.typesNames, value]
            }))
        // Si destilda la casilla
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
            // Verifico que no haya un Pokemon creado con el mismo nombre
            const { data } = await axios(`/pokemons/name?name=${newPokemon.name}`)
            alert(`Pokemon with name "${newPokemon.name[0].toUpperCase() + newPokemon.name.slice(1)}" already exists. Please choose another name`);
        } catch (error) {
            try {
                // Creo y obtengo el nuevo registro
                const { data } = await axios.post('/pokemons/', newPokemon); 
                // Actualizo el estado global
                dispatch(addPokemon(data)) 
                // Muestro mensaje de éxito al usuario
                alert(`Pokemon "${data.name[0].toUpperCase() + data.name.slice(1)}" has been created successfully with ID ${data.id}`);
                // Redirijo automáticamente a Home
                navigate('/home')
            } catch (error) {
                // Si hay errores de validación
                if(Object.keys(errors).length) alert("Pokemon creation failed: data is missing");
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

    return <div className={style.div}>

        <h1 className={style.h1}>Create your own Pokemon!</h1>
        <h3 className={style.h3}>Fill in the following fields. Those marked with * are mandatory</h3>

        <form action="" onSubmit={handleSubmit} className={style.formContainer}>

            <div className={style.form}>
                {/* Casillas input */}
                <div className={style.inputContainer}>
                    <input className={style.input} type="text" placeholder="Name*" value={newPokemon.name} name="name" autoComplete="off" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{nameValidation}</span>
                    <input className={style.input} type="number" placeholder="HP*" value={newPokemon.hp} name="hp" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{hpValidation}</span>
                    <input className={style.input} type="number" placeholder="Attack*" value={newPokemon.attack} name="attack" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{attackValidation}</span>
                    <input className={style.input} type="number" placeholder="Defense*" value={newPokemon.defense} name="defense" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{defenseValidation}</span>
                    <input className={style.input} type="number" placeholder="Speed" value={newPokemon.speed} name="speed" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{speedValidation}</span>
                    <input className={style.input} type="number" placeholder="Height" value={newPokemon.height} name="height" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{heightValidation}</span>
                    <input className={style.input} type="number" placeholder="Weight" value={newPokemon.weight} name="weight" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{weightValidation}</span>
                    <input className={style.input} type="url" placeholder="Main image URL*" value={newPokemon.imageClassic} name="imageClassic" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{imageClassicValidation}</span>
                    <input className={style.input} type="url" placeholder="2nd image URL" value={newPokemon.image3d} name="image3d" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{image3dValidation}</span>
                    <input className={style.input} type="url" placeholder="3rd image URL" value={newPokemon.imageArtistic} name="imageArtistic" onChange={handleChange}/>
                        <span className={style.inlineValidationMessage}>{imageArtisticValidation}</span>
                </div>

                {/* Fieldset */}
                <div>
                    <fieldset className={style.fieldset}>
                        <legend className={style.legend}>Choose your Pokemon's types*</legend>
                        {types.map(type => { 
                            return <div key={type.id}>
                                <input type="checkbox" id={type.id} name="types" value={type.name} onChange={handleCheckbox}/>
                                <label htmlFor={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</label> 
                            </div>
                        })}
                    </fieldset>
                </div>
            </div>

            {/* Submit button */}
            <input className={style.submitButton} type="submit" value="Create Pokemon" disabled={Object.keys(errors).length || !newPokemon.name}/>

            {/* Mensajes de validación */}
            <div className={style.finalValidationMessages}>
                <span>{nameNotNull}</span>
                <span>{hpNotNull}</span>
                <span>{attackNotNull}</span>
                <span>{defenseNotNull}</span>
                <span>{typesNamesValidation}</span>
                <span>{imageClassicNotNull}</span>       
            </div>

        </form>

    </div>
}