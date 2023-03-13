import { createSlice } from "@reduxjs/toolkit";

export const genreIdOrCategory = createSlice({
  name: "genreIdOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectgenreIdOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectgenreIdOrCategory, searchMovie } =
  genreIdOrCategory.actions;

export default genreIdOrCategory.reducer;
