import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../redux/actions";

export default function Landing() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [])

    
  const handleLogin = () => {
    navigate('/home')
  }

    return <div>
        <h1>Bienvenidos a la app de Pokemon</h1>
        <button onClick={handleLogin}>Entrar</button>
        <br />
        <img src="https://pokemonletsgo.pokemon.com/assets/img/how-to-play/hero-img.png" alt="landingImage" />
    </div>
}