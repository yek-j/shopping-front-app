import React, {useState} from "react";
import axios from "axios";
import Header from "../components/common/Header";
import UserField from "../components/common/UserField";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.username) setUsername(data.username);
        if(data.password) setPassword(data.password);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            email,
            username,
            password
        };
    
        const url = import.meta.env.VITE_API_URL + '/user/register';
        
        axios.post(url, data) 
            .then(response => {
                console.log("/user/register 응답");
    
                if(response.data.result == "success") {
                    alert("회원가입 성공");
                    navigate('/login');
                } else {
                    alert(response.data.value);
                }
            })
            .catch(error => {
                console.error('요청 실패', error);
            }); 
    }

    return(
        <div>
            <Header/>
            <UserField type="register" change={handleChange} submit={handleSubmit}/>
        </div>
    );
}

export default RegisterPage;