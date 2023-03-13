import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { Typography, Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const favoriteMovies = [];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites()
    refetchWatchlisted()
  }, [])
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results.length && !watchlistMovies?.results.length ? (
        <Typography>
          Add favorites or watchlist some movies to see them here
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
