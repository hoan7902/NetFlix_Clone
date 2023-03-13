import React from 'react';
import useStyles from './styles';
import { Typography, Grid, Tooltip, Rating, Grow } from '@mui/material';
import { Link } from 'react-router-dom';

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://file3.qdnd.vn/data/images/0/2023/02/26/trungthanh_tv/ronaldo%201.jpeg?dpi=150&quality=100&w=870'
            }
          />
          <Typography className={classes.title} variant="h5">
            {movie.title}
          </Typography>

          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
