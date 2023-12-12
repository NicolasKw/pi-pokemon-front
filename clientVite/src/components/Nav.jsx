import SearchBar from './SearchBar';
import { Link } from "react-router-dom";

export default function Nav() {
    return <div>
        <Link to='/home'><button>Home</button></Link>
        <Link to='/form'><button>Create Pokemon</button></Link>
        <SearchBar />
    </div>
}