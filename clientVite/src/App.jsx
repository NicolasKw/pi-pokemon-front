import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Landing from './components/Landing';
import Cards from './components/Cards/Cards';
import Form from './components/Form';
import Detail from './components/Detail';
import Nav from './components/Nav';


function App() {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const addedPokemons = useSelector(state => state.pokemons);

  useEffect(() => {
    const downloadTypes = async () => {
      try {
        await axios('http://localhost:3001/types')
      } catch (error) {
        console.log(error);
      }
    }
    downloadTypes();
  }, [])


  const login = () => {
    navigate('/home')
  }


  return <div>
    {pathname !== '/' && <Nav />}
    <Routes>
      <Route path='/' element={<Landing login={login} />} />
      <Route path='/home' element={<Cards />} />
      <Route path='/form' element={<Form />} />
      <Route path='/detail/:idPokemon' element={<Detail />} />
    </Routes>
  </div>
}

export default App