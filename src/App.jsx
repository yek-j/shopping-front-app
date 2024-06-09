import { Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import UserFindPage from './pages/user/UserFindPage';
import MyPage from './pages/user/MyPage';
import CartPage from './pages/item/CartPage';

function App() {
  return (    
    <Routes>
      <Route index element={<Main/>}  />   
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/find/:type' element={<UserFindPage/>} />  
      <Route path='/mypage' element={<MyPage/>} />
      <Route path='/cart' element={<CartPage/>} />
    </Routes>
  )
}

export default App;
