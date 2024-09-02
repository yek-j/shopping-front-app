import axios from 'axios';
import { format, isValid } from 'date-fns';

export const totalPrice = (data) => {
    let total = 0;
    for(let i=0; i<data.length; i++) {
        let price = data[i].price;
        let quantity = data[i].quantity;
        total = total + (price * quantity);
    }

    return total;
}

export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

const formatDateSafely = (date) => {
    if (date && isValid(new Date(date))) {
      return format(new Date(date), 'yyyy-MM-dd');
    }
    return null;
};

export const getOrderListAll = async (page, size) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/order/list';

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
            alert("주문 내역을 불러오지 못했습니다. 관리자에게 문의하세요.")
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}

export const getOrderListByPeriod = async (page, size, startDate, endDate) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/order/listByPeriod';

    try {
        // 날짜를 ISO 문자열로 변환
        const formattedStartDate = formatDateSafely(startDate, 'yyyy-MM-dd');
        const formattedEndDate = formatDateSafely(endDate, 'yyyy-MM-dd');
          
        const res = await axios.get(url,
            {
                headers: headers,
                params: {
                    page: page, 
                    size: size, 
                    startDate: formattedStartDate, 
                    endDate: formattedEndDate
                }
            },
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("주문 내역을 불러오지 못했습니다. 관리자에게 문의하세요.")
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}