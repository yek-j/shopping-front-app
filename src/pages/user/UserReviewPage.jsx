import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, Pagination, Typography } from "@mui/material";

const tmpData = [
    { reviewId: null, productId: 1, productName: '아이템1', image: '/test/test1.png', reviewState: false },
    { reviewId: 1, productId: 2, productName: '아이템2', image: '/test/test2.png', reviewState: true },
]

function UserReviewPage() {
    const [reviewList, setReviewList] = useState(tmpData);
    const [reviewTotal, setReviewTotal] = useState(1);
    const [reviewPage, setReviewPage] = useState(1);

    useEffect(() => {
        
    }, [reviewPage])

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