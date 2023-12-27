import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import style from "./Landing.module.css"

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

    return <div className={style.div}> 
     <div className={style.text}>
          <h1 className={style.h1}>Welcome!</h1>
          <p className={style.p}>In this Pokemon app you will be able to:</p>
          <ul>
            <li>Search for Pokemons</li>
            <li>View Pokemons information</li>
            <li>Filter them</li>
            <li>Sort them</li>
            <li>Create a new Pokemon</li>
          </ul>
          <button onClick={handleLogin} className={style.button}>Enter now!</button>
    </div>
    </div>
}