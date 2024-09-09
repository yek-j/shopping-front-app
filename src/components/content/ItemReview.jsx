import { Box, Card, CardContent, Pagination, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getReviewsByProduct } from "../../js/item/review";
import dayjs from "dayjs";

function ItemReview(props) {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    // props로 상품ID 값을 받아 리뷰를 가져온다.
    useEffect(() => {
        getReviews();
    },[page]);

    const getReviews = async () => {
        // 임시 데이터
        const result = await getReviewsByProduct(props.pid, page, 5);
        setReviews(result.data);
        setTotal(Math.ceil(result.total / 5)); // count 구하기
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
                        <Box display="flex" alignItems="right" justifyContent="right">
                            <Typography variant="body2">{dayjs(review.createAt).format('YYYY년 MM월 DD일 HH:mm:ss')}</Typography>
                        </Box>
                        
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

