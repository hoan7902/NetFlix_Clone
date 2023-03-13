import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tmdbApi } from "../services/TMDB";
import genreIdOrCategoryReducer from "../features/currentGenreOrCaregory";
import userReducer from "../features/auth";

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreIdOrCategory: genreIdOrCategoryReducer,
    user: userReducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export default store;
