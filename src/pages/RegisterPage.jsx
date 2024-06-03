import React, {useState} from "react";
import Header from "../components/common/Header";
import UserField from "../components/common/UserField";

function RegisterPage() {
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
    
        const url = 'http://localhost:8888/user/register';// 테스트
    
        axios.post(url, data) 
            .then(response => {
                console.log("/user/register 응답");
    
                if(response.data.result == "success") {
                    alert("회원가입 성공");
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