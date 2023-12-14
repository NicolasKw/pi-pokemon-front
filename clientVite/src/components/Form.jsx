import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../redux/actions";

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
        types: [],
        imageClassic: '',
        image3d: '',
        imageArtistic: ''
    })

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
        setNewPokemon((prevPokemon) => {
            if (checked) {
                return {
                    ...prevPokemon,
                    types: [...prevPokemon.types, value.toLowerCase()],
                };
            } else {
                return {
                    ...prevPokemon,
                    types: prevPokemon.types.filter(
                        (type) => type !== value.toLowerCase()
                    ),
                };
            }
        });
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
    }

    return <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={newPokemon.name} name="name" onChange={handleChange}/><br />
            <input type="number" placeholder="HP" value={newPokemon.hp} name="hp" onChange={handleChange}/><br />
            <input type="number" placeholder="Attack" value={newPokemon.attack} name="attack" onChange={handleChange}/><br />
            <input type="number" placeholder="Defense" value={newPokemon.defense} name="defense" onChange={handleChange}/><br />
            <input type="number" placeholder="Speed" value={newPokemon.speed} name="speed" onChange={handleChange}/><br />
            <input type="number" placeholder="Height" value={newPokemon.height} name="height" onChange={handleChange}/><br />
            <input type="number" placeholder="Weight" value={newPokemon.weight} name="weight" onChange={handleChange}/><br />
            <fieldset>
                <legend>Choose your Pokemon's types</legend>
                {types.map(type => { 
                    return <div key={type.id}>
                        <input type="checkbox" id={type.id} name="types" value={type.name} onChange={handleCheckbox}/>
                        <label htmlFor={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</label> 
                    </div>
                })}
            </fieldset>
            <input type="url" placeholder="Classic image URL" value={newPokemon.imageClassic} name="imageClassic" onChange={handleChange}/><br />
            <input type="url" placeholder="3D image URL" value={newPokemon.image3d} name="image3d" onChange={handleChange}/><br />
            <input type="url" placeholder="Artistic image URL" value={newPokemon.imageArtistic} name="imageArtistic" onChange={handleChange}/><br />
            <input type="submit" value="Create Pokemon"/>
        </form>
    </div>
}