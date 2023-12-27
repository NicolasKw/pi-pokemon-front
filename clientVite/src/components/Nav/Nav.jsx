import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import style from "./Nav.module.css"

export default function Nav() {
    return <div className={style.div}>

        {/* Botones de Home y Create Pokemon */}
        <div>
            <Link to='/home'><button className={style.button}>Home</button></Link>
            <Link to='/form'><button className={style.button}>Create Pokemon</button></Link>
        </div>

        {/* Barra de búsqueda */}
        <div>
            <SearchBar />
        </div>

        {/* Imagen logo */}
        <div className={style.logoPokemon}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="logoPokemon" width='120em'/>
        </div>

    </div>
}