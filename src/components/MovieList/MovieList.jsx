import React from "react";
import { Grid } from "@mui/material";
import { Movie } from "../";
import useStyles from './styles'

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles()
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <div>
      <Grid container className={classes.moviesContainer}>
        {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => {
          return <Movie key={i} movie={movie} i={i} />;
        })}
      </Grid>
    </div>
  );
};

export default MovieList;
