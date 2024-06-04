import { Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserFindPage from './pages/UserFindPage';

function App() {
  return (    
    <Routes>
      <Route index element={<Main/>}  />   
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/find/:type' element={<UserFindPage/>} />  
    </Routes>
  )
}

export default App;
