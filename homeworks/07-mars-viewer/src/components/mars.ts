import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import nasa, { NasaApi } from '../app/api';

export type Status = 'idle' | 'loading';

export type RoverPhoto = number;

export type MarsPhoto = {
  id: RoverPhoto;
  imgSrc: string;
  roverName: string;
  cameraFullName: string;
};

export type MarsRover = {
  status: Status;
  selectedSol: number;
  sols: { [key: number]: RoverPhoto[] };
  photos: MarsPhoto[];
};

const initialState: MarsRover = {
  status: 'idle',
  selectedSol: 1,
  sols: {},
  photos: [],
};

export const getSol = createAsyncThunk(
  'mars/getSol',
  async (sol: number, { dispatch }) => {
    const response = await nasa.get<NasaApi>('/', { params: { sol } });
    const { photos } = response.data;
    const marsPhotos: MarsPhoto[] = photos.map((p) => ({
      id: p.id,
      imgSrc: p.img_src,
      roverName: p.rover.name,
      cameraFullName: p.camera.full_name,
    }));
    const marsPhotoId = photos.map((p) => p.id);
    dispatch(addPhotos(marsPhotos));
    dispatch(addSol({ sol, photos: marsPhotoId }));
    return response.data;
  }
);

export const slices = createSlice({
  name: 'mars',
  initialState,
  reducers: {
    addPhotos: (state, action: PayloadAction<MarsPhoto[]>) => {
      state.photos.push(...action.payload);
    },
    addSol: (
      state,
      action: PayloadAction<{ sol: number; photos: RoverPhoto[] }>
    ) => {
      const { sol, photos } = action.payload;
      state.sols[sol] = photos;
    },
    changeSol: (state, action: PayloadAction<number>) => {
      state.selectedSol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSol.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSol.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const getSelectedSol = (state: RootState) => state.mars.selectedSol;
export const getStatus = (state: RootState) => state.mars.status;
export const getSols = (state: RootState) => state.mars.sols;
export const getPhotos = (state: RootState) => state.mars.photos;
export const { addPhotos, addSol, changeSol } = slices.actions;
export default slices.reducer;
