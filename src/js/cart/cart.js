import axios from "axios";
import { getHeader } from "../admin/admin";

export const addCart = async (data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/cart/add';

    try {
        const res = await axios.post(url, data, {headers});
        if(res.data.result == "success") {
            alert("장바구니에 추가되었습니다.");
            update();
        } else {
            alert(res.data.value)
        }
    } catch(e) {
        console.error(e);
    }
}

export const getTotalPrice = (data) => {
    let total = 0;
    for(let i=0; i<data.length; i++) {
        let price = data[i].product.price;
        let quantity = data[i].quantity;

        total = total + (price * quantity);
    }

    return total;
}

export const updateCart = async (data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/cart/update';

    try {
        const res = await axios.put(url, data, {headers});
        if(res.data.result == "success") {
            alert("장바구니 주문 정보가 수정되었습니다.");
            update();
        } else {
            alert(res.data.value)
        }
    } catch(e) {
        console.error(e);
    }
}

export const deleteCart = async (data, update) => {
    const headers = getHeader('application/json');
    const url = import.meta.env.VITE_API_URL + '/cart/delete';

    try {
        const res = await axios.delete(url, {headers, data});
        if (res.data.result == "success") {
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.error(e);
    }
}