import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

const RatedCards = ({ title, data }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      <Box className={classes.container} display="flex" flexWrap="wrap">
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
