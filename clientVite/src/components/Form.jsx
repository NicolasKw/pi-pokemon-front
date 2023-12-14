import axios from "axios";
import { useState, useEffect } from "react";

export default function Form() {

    const [types, setTypes] = useState([]);

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

    // Traigo todos los types de la DB
    useEffect(() => {
        const downloadData = async() => {
            try {
                const { data } = await axios('http://localhost:3001/types');
                const typesNames = data.map(elem => elem.name);
                setTypes(typesNames);
            } catch (error) {
                console.log(error);
            }
        }
        downloadData();
    }, []);

    const handleChange = (event) => {
        setNewPokemon({
            ...newPokemon,
            [event.target.name]: event.target.value.toLowerCase()
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/pokemons/', newPokemon);
            alert("Pokemon has been created successfully");
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
                    return <div>
                        <input type="checkbox" id={type} name="types" value={newPokemon.types} onChange={handleChange}/>
                        <label htmlFor={type} key={type}>{type[0].toUpperCase() + type.slice(1)}</label> 
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