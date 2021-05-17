import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type RoverRoute = 'photos' | 'favourites';

export type Router = {
  selectedRoute: RoverRoute;
};

const initialState: Router = {
  selectedRoute: 'photos',
};

export const route = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    changeRoute: (state, action: PayloadAction<RoverRoute>) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const { changeRoute } = route.actions;
export const selectRoute = (state: RootState) => state.routes.selectedRoute;
export default route.reducer;
