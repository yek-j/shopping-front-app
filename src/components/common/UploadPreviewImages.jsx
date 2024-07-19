import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

function UploadPreviewImages(props) {
    return(
        <ImageList 
            cols={5}
            sx={{ height: '100%', width: '100%'}}
        >
            {props.imgs.map((img, index) => (
                <ImageListItem key={img} >
                    <img
                        srcSet={img}
                        src={img}
                    />
                    <ImageListItemBar
                         sx={{
                            background:
                              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          }}
                          position="top"
                          actionIcon={
                            <IconButton
                                sx={{ color: 'white' }}
                                onClick={() => props.handleDelete(index)}
                            >
                                <CloseIcon/>
                            </IconButton>
                          }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default UploadPreviewImages;