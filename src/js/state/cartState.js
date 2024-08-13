import { atom, selector } from "recoil";
import axios from "axios";

export const cartListAtom = atom({
    key: 'cartListAtom',
    default: [],
});

export const cartTotalSelector = selector({
    key: 'cartTotalSelector',
    get: ({ get }) => {
        const cartlist = get(cartListAtom);
        return cartlist.length;
    }
});

export const getCartList = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/cart/list');
        if(res.data.result == "success") {
            return res.data.value.data;
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}