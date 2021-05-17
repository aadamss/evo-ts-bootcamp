import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { RoverPhoto } from './mars';

export type Favourites = {
  photoIds: RoverPhoto[];
};

const initialState: Favourites = {
  photoIds: [],
};

export const favourites = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.photoIds.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.photoIds.findIndex((id) => id === action.payload);
      if (index !== -1) {
        state.photoIds.splice(index, 1);
      }
    },
  },
});

export const getPhotoIds = (state: RootState) => state.favourites.photoIds;
export const { add: addToFavourites, remove: removeFromFavourites } =
  favourites.actions;
export default favourites.reducer;
