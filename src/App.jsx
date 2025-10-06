
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Read from './components/Read'
import Create from './components/Create'
import Update from './components/Update'

function App() {


  return (
    <BrowserRouter>
    <>
  <Routes>
    <Route path='/' element={<Read  />} />
    <Route path='/create' element={<Create />} />
    <Route path='/update' element={<Update />} />
    <Route path='*' element={<h2>404 not found</h2>} />
  </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
