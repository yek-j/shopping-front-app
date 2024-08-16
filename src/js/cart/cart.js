import axios from "axios";

export const addCart = async (data) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/cart/add';

    try {
        const res = await axios.post(url, data, {headers});
        if(res.data.result == "success") {
            alert("장바구니에 추가되었습니다.");
            return true;
        } else {
            alert(res.data.value)
        }
    } catch(e) {
        console.error(e);
    }

    return false;
}