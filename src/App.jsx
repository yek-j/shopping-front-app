import { Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (    
    <Routes>
      <Route path='/' element={<Main/>}  />   
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />   
    </Routes>
  )
}

export default App;
