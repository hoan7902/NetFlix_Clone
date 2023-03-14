import React, { useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  Box,
  ButtonGroup,
  Grid,
  CircularProgress,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectgenreIdOrCategory } from '../../features/currentGenreOrCaregory';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';
import { toast } from 'react-toastify';

const MoviesInformation = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const [isMovieFavorited, setIsMovieFavorited] = useState(true);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: recommendations } =
    useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    if (!localStorage.getItem('session_id')) {
      toast.error('You must login for this action!');
      return;
    }
    setIsMovieFavorited(!isMovieFavorited);
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    if (data.success) {
      toast.success(data.status_message);
    }
    else {
      toast.error(data.status_message);
    }
  };

  const addToWatchList = async () => {
    if (!localStorage.getItem('session_id')) {
      toast.error('You must login for this action!');
      return;
    }
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    if (data.success) {
      toast.success(data.status_message);
    }
    else {
      toast.error(data.status_message);
    }
    setIsMovieWatchlisted(!isMovieWatchlisted);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong</Link>
      </Box>
    );
  }
  return (
    data && (
      <Grid container className={classes.containerSpaceAround}>
        <Grid
          item
          sm={12}
          lg={4}
          style={{
            display: 'flex',
            marginBottom: '35px',
            justifyContent: 'center',
          }}
        >
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h4" align="center" gutterBottom>
            {data.title} ({data.release_date.split('-')[0]})
          </Typography>
          <Typography varint="h5" align="center" gutterBottom>
            {data.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={(data.vote_average / 2).toFixed(1)} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginLeft: '10px' }}
              >
                {data.vote_average.toFixed(1)} / 10
              </Typography>
              <Typography
                marginLeft="30px"
                variant="subtitle1"
                align="center"
                gutterBottom
              >
                {data.runtime}
                {data.spoken_languages.length > 0
                  ? `min / ${data.spoken_languages[0].name}`
                  : ''}
              </Typography>
            </Box>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data.genres.map((genre, i) => (
              <Link
                onClick={() => dispatch(selectgenreIdOrCategory(genre.id))}
                key={genre.name}
                className={classes.links}
                to="/"
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                  alt='genre-name'
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre.name}
                </Typography>
              </Link>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: '2rem' }}>
            {data.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits.cast
                .map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid
                        key={i}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <img
                          className={classes.castImage}
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                        />
                        <Typography color="textPrimary">
                          {character.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {character.character.split('/')[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .slice(0, 6)}
          </Grid>

          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('check data nè: ', data);
                      setOpen(true);
                    }}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    onClick={() => addToFavorites()}
                    endIcon={
                      isMovieFavorited ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    <Typography variant="h7">
                      {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                    </Typography>
                  </Button>
                  <Button
                    onClick={addToWatchList}
                    endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                  >
                    <Typography variant="h7">Watchlist</Typography>
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: 'primary.main' }}
                  >
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="h7"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Box marginTop="5rem" width="100%">
          <Typography variant="h3" gutterBottom align="center">
            You might also like
          </Typography>
          {recommendations ? (
            <MovieList movies={recommendations} numberOfMovies={12} />
          ) : (
            <Typography>Sorry, nothing was found.</Typography>
          )}
        </Box>

        <Modal
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
        >
          {data.videos.results.length > 0 && (
            <iframe
              autoPlay
              className={classes.video}
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </Modal>
      </Grid>
    )
  );
};

export default MoviesInformation;
