import React, {useState} from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import UserField from "../../components/common/UserField";
import { useNavigate } from 'react-router-dom';
import TextDialog from "../../components/common/TextDialog";

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.username) setUsername(data.username);
        if(data.password) setPassword(data.password);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            email,
            username,
            password
        };
    
        const url = import.meta.env.VITE_API_URL + '/user/register';
        
        try {
            const res = await axios.post(url, data);
            if(res.data.result == "success") {
                alert("회원가입 성공");
                navigate('/login');
            } else {
                setMessage(res.data.value);
                setOpen(true);
            }
        } catch(e) {
            console.error('요청 실패', error);
        }
    }

    return(
        <div>
            <Header/>
            <TextDialog open={open} message={message} close={() => setOpen(false)} /> 
            <UserField type="register" change={handleChange} submit={handleSubmit}/>
        </div>
    );
}

export default RegisterPage;