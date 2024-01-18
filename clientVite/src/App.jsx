import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Landing from './components/Landing/Landing';
import Cards from './components/Cards/Cards';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';

function App() {

  // axios.defaults.baseURL = 'http://localhost:3001';
  axios.defaults.baseURL = 'pi-pokemon-back-production-1f13.up.railway.app';

  const { pathname } = useLocation();

  // Cargo los types en la DB
  useEffect(() => {
    const downloadTypes = async () => {
      try {
        await axios('/types')
      } catch (error) {
        console.log(error);
      }
    }
    downloadTypes();
  }, [])


  return <div>
    {pathname !== '/' && <Nav />}
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Cards />} />
      <Route path='/form' element={<Form />} />
      <Route path='/detail/:idPokemon' element={<Detail />} />
    </Routes>
  </div>
}

export default App