import React, { useState } from "react";
import Header from "../components/common/Header";
import UserField from "../components/common/UserField";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.password) setPassword(data.password);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email,
            password
        };

        const url = import.meta.env.VITE_API_URL + "/user/login";

        axios.post(url, data)
            .then(response => {
                if(response.data.result == "success") {
                    localStorage.setItem("token", data.value);
                    navigate('/');
                } else {
                    alert("이메일이나 패스워드가 틀렸습니다.");
                }
            })
            .catch(error => {
                console.error('요청 실패', error);
            })
    }    

    return (
        <div>
            <Header/>
            <UserField type="login" change={handleChange} submit={handleSubmit} />
        </div>
    )
}

export default LoginPage;