// API 서버 URL
const SERVER_BASE_URL = import.meta.env.VITE_API_URL + '/';
import * as PortOne from "@portone/browser-sdk/v2";

// 결제 시 통신할 API 서버 URL
var nextUrl = "";

// 결제 실패 시 통신할 API 서버 URL
var failUrl = "order/fail";

/**
 * @function requestOrder
 * @param {string} token - JWT 토큰 입력
 * @param {Array<{productId: number, quantity: number}>} productList - 상품 목록
 *> [Example]
    // 상품 목록 파라미터 변수 형식 예시
    var productList = {
        "product" : [
            {
                "productId" : 1,
                "quantity" : 1
            },
            {
                "productId" : 2,
                "quantity" : 2
            }
        ]
    };

    // 토큰 파라미터 변수 형식 예시
    var token = "eyJhbGciOiJIUzI1NiJ9..생략";

*/

// 주문 요청
export function requestOrder(token, productList) { //token, productList) {
    // API 서버에서 주문번호 받아오기
    fetch(SERVER_BASE_URL+"order/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token //userToken
        },
        body : JSON.stringify(productList)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('네트워크 응답이 없습니다. ' + res.statusText);
          }
          return res.json();
    })
    // API 통신이 성공했으면 결제 진행
    .then(data =>{
        nextUrl = data.value.nextUrl;
        requestPayment(data.value, token); // userToken);
    })
    // API 통신이 오류가 발생했으면 결제 실패 상태로 변경
    .catch(error => {
        alert("[requestOrder] 주문 요청 " + error);
    })
}

// 결제 요청
async function requestPayment(data, userToken) {
    // 포트원 결제 시스템 호출
    const response = await PortOne.requestPayment({
        storeId: data.storeId, // Store ID
        channelKey: data.channelKey, // 채널 키
        paymentId: data.paymentId,
        orderName: data.orderName,
        totalAmount: data.totalAmount,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
    })
    .catch(error => {
        // 결제 시스템 관련 오류 발생 시 알림 메시지
        failPayment(data.paymentId, "[PortOne] 결제 시스템 " + error, userToken);
    });

    // 결제 요청이 실패할 경우
    if (response.code != null) {
        // 오류 발생
        failPayment(data.paymentId, "[PortOne] 결제 오류 " + response.message, userToken);
        return 0;
    }

    // 결제 결과 처리
    const notified = await fetch(SERVER_BASE_URL+nextUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : "Bearer " + userToken
        },
        body: JSON.stringify({
            paymentId: response.paymentId,
            txId: response.txId,
            totalAmount: response.totalAmount
        })
    })
    // 결제 성공
    .then(res => {
        if (!res.ok) {
            failPayment(data.paymentId, '# requestPayment : 네트워크 응답이 없습니다. ' + res.statusText, userToken);
            return;
        }
        alert("결제 성공!");
        return res.json();
    })
    // 결제 실패
    .catch(error => {
        failPayment(data.paymentId, "[requestPayment] 결제 요청 실패 " + error, userToken)
    })
}

// 결제 실패
async function failPayment(paymentId, message, userToken) {
    // API 서버에게 주문이 실패하였다는 것을 알리기 위함
    await fetch(SERVER_BASE_URL+failUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : "Bearer " + userToken
        },
        body: JSON.stringify({
            paymentId: paymentId
        })
    })
    // API 서버에서 주문 결제 실패 확인
    .then(res => {
        if (!res.ok) {
            throw new Error('# failPayment : 네트워크 응답이 없습니다. ' + res.statusText);
        }
        alert(message);
        return res.json();
    })
    // 오류 발생
    .catch(error => {
        alert("[failPayment] 결제 실패 " + error);
    })
}