import axios from 'axios';

export type CameraProperties = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type RoverProperties = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
};

export type RoverPhotoProperties = {
  camera: CameraProperties;
  rover: RoverProperties;
  earth_date: string;
  sol: number;
  id: number;
  img_src: string;
};

export type NasaApi = {
  photos: RoverPhotoProperties[];
};

export default axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos',
  params: {
    api_key: '2xoUzsQhUD61au8WaUxxYzmM8rEEiYPAoTrLXUcB',
  },
});
