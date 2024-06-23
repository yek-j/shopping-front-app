import { atom, selector } from "recoil";
import axios from "axios";

export const categoryAtom = atom({
    key: 'categoryAtom',
    default: [],
});

export const categorySelector = selector({
    key: 'categorySelector',
    get: async ({ get }) => {
        const categorylist = await get(categoryAtom);

        if(categorylist.length === 0) {
            const res = await axios.get(import.meta.env.VITE_API_URL + '/product/category/list');
            return res.data.value;
        }
        return categorylist;
    }
});