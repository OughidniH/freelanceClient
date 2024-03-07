// HeroSection.js
import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";

const HeroSection = () => {
  // You can add filter logic and state management here

  return (
    <Grid container spacing={2}>
      {/* Filters Bar */}
      <Grid item xs={12}>
        <Typography variant="h5">Filters Bar</Typography>
        {/* Add your filter components here */}
      </Grid>

      {/* Product Grid */}
      <Grid item xs={12}>
      <Card   sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          name freelance
        </Typography>
        <PlaceOutlined/> <span>Place</span>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
