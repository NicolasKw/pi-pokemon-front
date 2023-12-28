import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Landing from './components/Landing/Landing';
import Cards from './components/Cards/Cards';
import Form from './components/Form';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import style from './App.module.css'

function App() {

  const { pathname } = useLocation();

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


  return <div className={style.div}>
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