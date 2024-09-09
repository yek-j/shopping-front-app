import axios from "axios";
import { getHeader } from "../admin/admin";

export const getReviewByUser = async(page, size) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/review/list';

    try {
        const res = await axios.get(url, 
            {
                headers: headers,
                params: {page: page, size: size}
            },
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("리뷰를 불러올 수 없습니다. 관리자에게 문의하세요.")
        }

    } catch (e) {
        console.error(e);
    }

    return [];
}

export const addReview = async(data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/review/add';

    try {
        const res = await axios.post(url, data, {headers});
        
        if(res.data.result == "success") {
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.error(e);
    }
}

export const updateReview = async(data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/review/update';

    try {
        const res = await axios.put(url, data, {headers});

        if(res.data.result == "success") {
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.error(e);
    }
}

export const deleteReview = async(data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/review/delete';

    try {
        const res = await axios.delete(url, {headers, data});

        if(res.data.result == "success") {
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.log(e);
    }
}

export const getReviewsByProduct = async (pid, page, size) => {
    const url = `${import.meta.env.VITE_API_URL}/review/list/${pid}`;
    try {
        const res = await axios.get(url, 
            {
                params: {page: page, size: size}
            },
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.error(e);
    }
}