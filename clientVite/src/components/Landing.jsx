import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../redux/actions";

export default function Landing({login}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [])

    return <div>
        <h1>Bienvenidos a la app de Pokemon</h1>
        <button onClick={login}>Entrar</button>
    </div>
}