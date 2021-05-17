import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RoverRoute } from './roverRoute';
import { changeRoute, selectRoute } from './roverRoute';
import style from './MarsRover.module.css';


export type RouteProperties = {
    name: RoverRoute;
};

export const Route: React.FC<RouteProperties> = ({ name, children }) => {
    const selectedRoute = useAppSelector(selectRoute);
    const dispatch = useAppDispatch();

    const selected = selectedRoute === name;
    const className = selected ? style.selected : style.unselected;
    const onClick = selected ? undefined : () => dispatch(changeRoute(name));

    return (
        <span onClick={onClick} className={className}>
            <img src={require('../assets/mars.gif').default} alt='Loading...'></img>
            <p>
            {children}
            </p>
            </span>
           
    );
};

export const Routes: React.FC = () => {
    return (
        <div className={style.marsRover}>
            <div className={style.links}>
            <Route name='photos'>
                Photos
            </Route>
            <> | </>
            <Route name='favourites'>
                Favourites
            </Route>
            </div>
        </div>
    );
};
