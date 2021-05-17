import React from 'react';
import { useAppSelector } from './app/hooks';
import { RoverRoute, selectRoute } from './utils/roverRoute';
import { Photos } from './components/Elements';
import { Favourites } from './components/Elements';
import { Routes } from './utils/MarsRover';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
        <Routes />
        <MarsViewer />
        <div className='background'></div>
    </div>
  );
}

export const MarsViewer: React.FC = () => {
    const selectedRoute = useAppSelector(selectRoute);

    const manifest: { [key in RoverRoute]: JSX.Element } = {
        photos: <Photos />,
        favourites: <Favourites />
    }

    return manifest[selectedRoute];
};

export default App;
