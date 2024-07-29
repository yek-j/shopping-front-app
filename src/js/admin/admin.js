import axios from "axios";

export const getCategoryList = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/product/category/list');
        
        if(res.data.result == "success") {
            return res.data.value.data;
        } else {
            alert("카테고리 리스트를 불러오지 못했습니다.")
        }
    } catch(e) {
        console.log(e);
    }

    return [];
}

export const getItemList = async(page, size) => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + 
        `/product/list?page=${page}&size=${size}`);
        
        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("상품 리스트를 불러오지 못했습니다.");
        }
    } catch(e) {
        console.error(e);
    }
    
    return [];
}

export const addCategory = (data) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/category/add';
        const token = localStorage.getItem('token');
        const res = axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(res.data.result == "success") {
            return true;
        } else {
            alert(res.data.value);
        }
    } catch (e) {
        console.log(e);
    }

    return false;
}