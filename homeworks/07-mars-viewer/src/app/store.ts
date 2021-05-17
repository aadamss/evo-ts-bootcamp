import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routeReducer from '../utils/roverRoute';
import marsReducer from '../components/mars';
import favouritesReducer from '../components/favourites';

export const store = configureStore({
  reducer: {
    routes: routeReducer,
    mars: marsReducer,
    favourites: favouritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
