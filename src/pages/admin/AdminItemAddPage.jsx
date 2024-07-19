import { FormControl, Stack, TextField, Button, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import UploadPreviewImages from "../../components/common/UploadPreviewImages";

function AdminItemAddPage(props) {
    const [categoryId, setCategoryId] = useState();
    const [images, setImages] = useState([]);

    const categoryIdChange = (event) => {
        setCategoryId(event.target.value);
    }

    const imageChange = (event) => {
        const imgLists = event.target.files;
        let imgUrlLists = [...images];
        for (let i = 0; i < imgLists.length; i++) {
            const curImgUrl = URL.createObjectURL(imgLists[i]);
            if(imgUrlLists.length < 5) imgUrlLists.push(curImgUrl);
        } 

        setImages(imgUrlLists);
    }

    const imageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    return(
        <Stack
            sx={{ 
                width: '50%'
            }}
        >
            <FormControl sx={{ marginBottom: 3 }}>
                <InputLabel id="categoryLabel">카테고리</InputLabel>
                <Select
                    labelId="categoryLabel"
                    id="categoryId"
                    value={categoryId || ""}
                    label="categoryId"
                    onChange={categoryIdChange}
                    sx={{ width: '50%',marginBottom: 3 }}
                >
                    {props.list.map((category) => (
                        <MenuItem key={category.categoryId} value={category.categoryId}>{category.name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    required
                    id="name"
                    label="상품 이름"
                    sx={{ width: '50%', marginBottom: 3}}
                />
                <TextField
                    type="number"
                    label="상품 가격"
                    id="price"
                    sx={{ width: '50%', marginBottom: 3}}  
                />
                <TextField
                    type="number"
                    label="상품 재고"
                    id="quantity"
                    sx={{ width: '50%', marginBottom: 3}}  
                />
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    id="productDescription"
                    label="상품 설명"
                    sx={{ marginBottom: 1}}  
                />
                <Grid 
                    container 
                    spacing={2} 
                >
                    <Grid item xs={9} sx={{ height: 100}}>
                        <UploadPreviewImages imgs={images} handleDelete={imageDelete}/>
                    </Grid>
                    <Grid item xs={3} sx={{ paddingLeft: 3, marginTop: 1.5}}>
                        <Button
                            component="label"
                            variant="contained"
                        >
                            파일 선택
                            <input 
                                id="image" 
                                onChange={imageChange} 
                                type="file" 
                                hidden 
                                multiple 
                                accept="image/*"/>
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
            <Button variant="contained" type="submit">
                상품 등록
            </Button>
        </Stack>
    );
}

export default AdminItemAddPage;