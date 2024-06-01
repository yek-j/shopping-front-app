import { Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (    
    <Routes>
      <Route path='/' element={<Main/>}  />   
      <Route path='/login' element={<LoginPage/>} />   
    </Routes>
  )
}

export default App;
