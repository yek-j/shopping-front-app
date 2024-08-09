import { FormControl, Stack, TextField, Button, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import UploadPreviewImages from "../../components/common/UploadPreviewImages";
import { addProduct } from "../../js/admin/admin";

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
            const file = imgLists[i];
            const preview = URL.createObjectURL(file);
            if(imgUrlLists.length < 5) imgUrlLists.push({file, preview});
        } 

        setImages(imgUrlLists);
    }

    const imageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target.form);
        const productData = {
            name: data.get('name'),
            price: Number(data.get('price')),
            description: data.get('description'),
            categoryId: categoryId,
            quantity: Number(data.get('quantity'))
        }

        const formData = new FormData();
        
        formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
        for (const img of images) {
            formData.append('image', img.file);
        }
        
        await addProduct(formData, props.update)
    }

    return(
        <Stack
            sx={{ 
                width: '50%'
            }}
           component="form"
        >
            <FormControl>
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
            </FormControl>
            <FormControl>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="상품 이름"
                    sx={{ width: '50%', marginBottom: 3}}
                />
            </FormControl>
            <FormControl>
                <TextField
                    type="number"
                    label="상품 가격"
                    id="price"
                    InputProps={{ inputProps: { min: 1 } }}
                    name="price"
                    sx={{ width: '50%', marginBottom: 3}}  
                />
            </FormControl>
            <FormControl>
                <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    label="상품 재고"
                    id="quantity"
                    name="quantity"
                    sx={{ width: '50%', marginBottom: 3}}  
                />
            </FormControl>
            <FormControl>
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    id="description"
                    name="description"
                    label="상품 설명"
                    sx={{ marginBottom: 1}}  
                />
            </FormControl>
            <FormControl sx={{marginBottom: 3}}>
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
                                name="image"
                                onChange={imageChange} 
                                type="file" 
                                hidden 
                                multiple 
                                accept="image/*"/>
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
                상품 등록
            </Button>
        </Stack>
    );
}

export default AdminItemAddPage;