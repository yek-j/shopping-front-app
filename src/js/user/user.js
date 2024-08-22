import axios from 'axios';

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