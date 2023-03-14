import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { FeaturedMovie, MovieList, Pagination } from "../";
import useStyles from "./styles"

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreIdOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const classes = useStyles()
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'))
  const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      className={classes.waitBox}
    >
      <CircularProgress size="4rem" />
    </Box>
    );
  }

  if (data && data.results.length === 0) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movies that match that name</Typography>
        <br />
        Please search for something else
      </Box>
    );
  }

  if (error) return "An error has occured";

  return (
    <Box>
      <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </Box>
  );
};

export default Movies;
