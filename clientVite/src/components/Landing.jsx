import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPokemons, addTypes } from "../redux/actions";

export default function Landing({login}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addTypes());
        dispatch(addPokemons());
    }, [])

    return <div>
        <h1>Bienvenidos a la app de Pokemon</h1>
        <button onClick={login}>Entrar</button>
    </div>
}