import React, { useState } from "react";
import Header from "../../components/common/Header";
import UserField from "../../components/common/UserField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextDialog from "../../components/common/TextDialog";


function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.password) setPassword(data.password);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email,
            password
        };

        const url = import.meta.env.VITE_API_URL + "/user/login";

        try {
            const res = await axios.post(url, data);
            if(res.data.result == "success") {
                localStorage.setItem("token", res.data.value);
                navigate('/');
            } else {
                setMessage("이메일이나 패스워드가 틀렸습니다.");
                setOpen(true);
            }
        } catch(e) {
            console.error('요청 실패', error);
        }
    }    

    return (
        <div>
            <Header/>
            <TextDialog open={open} message={message} close={() => setOpen(false)} /> 
            <UserField type="login" change={handleChange} submit={handleSubmit} />
        </div>
    )
}

export default LoginPage;