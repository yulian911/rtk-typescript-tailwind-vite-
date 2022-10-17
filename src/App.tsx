import {Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import FavoritePage from './pages/FavoritePage'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <>
      <Navigation/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/favorite' element={<FavoritePage/>}/>

      </Routes>
    
    </>
  )
}