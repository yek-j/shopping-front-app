import { atom } from "recoil";
import axios from "axios";

export const cartListAtom = atom({
    key: 'cartListAtom',
    default: [],
});

export const cartStateAtom = atom({
    key: 'cartStateAtom',
    default: false,
});

export const getCartList = async () => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/cart/list';
    try {
        const res = await axios.get(url, {headers});
        if(res.data.result == "success") {
            return res.data.value.data;
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}