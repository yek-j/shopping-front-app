import axios from 'axios';
import { getHeader } from "../admin/admin";

export const getUser = async () => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/user/getuser';

    try {
        const res = await axios.get(url, { headers });

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("회원 정보를 불러오지 못했습니다.");
        }
    } catch(e) {
        console.error(e);
    }
}

export const updateUser = async (data) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/user/update';

    try {
        const res = await axios.put(url, data, { headers });

        if(res.data.result == "success") {
            alert("회원 정보 수정 완료");
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.error(e);
    }
}