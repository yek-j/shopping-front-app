import { Box, Card, CardContent, Pagination, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

// 임시 리뷰 데이터
const imsiReview = [
    {
        reviewId: 1,
        userName: '사용자1',
        rating: 1,
        comment: "별로임",
        createAt: "2024-07-07",
    },
    {
        reviewId: 2,
        userName: '사용자2',
        rating: 2,
        comment: "별로임",
        createAt: "2024-07-07",
    },
    {
        reviewId: 3,
        userName: '사용자3',
        rating: 5,
        comment: "좋아요",
        createAt: "2024-07-07",
    },
];

function ItemReview(props) {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    // props로 상품ID 값을 받아 리뷰를 가져온다.
    useEffect(() => {
        getReviews();
    },[]);

    const getReviews = () => {
        // 임시 데이터
        setReviews(imsiReview);
        setTotal(Math.ceil(imsiReview.length / 5)); // count 구하기
    }

    const handlePageChange = (event, curPage) => {
        setPage(curPage);
      }

    return(
        <Stack spacing={2}>
            {reviews.length === 0 && <Typography variant="h3">리뷰가 없습니다.</Typography>}
            {reviews.map((review) => (
                <Card>
                    <CardContent>
                        <Typography variant="h6">{reviews.userName}</Typography>
                        <Rating value={review.rating} readOnly />
                        <Typography variant="body1">{review.comment}</Typography>
                    </CardContent>
                </Card>
            ))}
            { reviews.length !== 0 && 
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Pagination
                        count={total}
                        onChange={handlePageChange}
                        style={{
                            marginBottom: 30,
                        }}/>
                </Box>
            }
        </Stack>
    );   
}

export default ItemReview;

