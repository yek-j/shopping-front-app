import React from 'react'
import Header from '../components/common/Header'
import Carousel from '../components/content/Carousel';
import ItemList from '../components/content/ItemList';

import { Grid } from '@mui/material';

function Main() {
  return (
    <>
      <Header/>
      <Carousel/>
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{marginTop: 10}}
      >
        <h1>Best</h1>
        <ItemList/>
      </Grid>
    </>
  )
}

export default Main;
