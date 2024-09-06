import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, Pagination, Typography } from "@mui/material";
import { getReviewByUser } from "../../js/item/review";

function UserReviewPage() {
    const [reviewList, setReviewList] = useState([]);
    const [reviewTotal, setReviewTotal] = useState(1);
    const [reviewPage, setReviewPage] = useState(1);

    useEffect(() => {
        fetchReviews();
    }, [reviewPage])

    const fetchReviews = async () => {
        const result = await getReviewByUser(reviewPage, 10);
        setReviewList(result.data);
        if(result.length != 0) setReviewTotal(Math.ceil(result.total / 10));
    }

    return (
        <Box>
            <List>
                {reviewList.map((review) => (
                    <div>
                        <ListItem
                            key={review.productId}
                            alignItems="flex-start"
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    src={review.image}
                                    alert={review.productName}
                                    sx={{width: 80, height: 80}}
                                />
                            </ListItemAvatar>
                            <Box sx={{ ml: 2, flex: 1}}>
                                <Typography variant="h6" component="div">
                                    {review.productName}
                                </Typography>
                            </Box>
                            {review.reviewState && <Button>리뷰 수정</Button>}
                            {!review.reviewState && <Button>리뷰 작성</Button>}
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Pagination
                    count={reviewTotal}
                    onChange={(e, curPage) => setReviewPage(curPage)}
                    sx={{my: 2}}
                />
            </Box>
            
        </Box>
    );
}

export default UserReviewPage;