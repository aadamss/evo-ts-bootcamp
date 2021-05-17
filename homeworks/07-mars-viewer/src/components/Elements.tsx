import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addToFavourites, removeFromFavourites, getPhotoIds } from './favourites';
import { getSelectedSol, getSols, getPhotos, changeSol, getSol, MarsPhoto, RoverPhoto } from './mars';
import style from './Elements.module.css';

export type PhotoProperties = {
    photo: MarsPhoto;
};

export type GridProperties = {
    photos: MarsPhoto[];
    onEmpty: string;
};

export type HeartProperties = {
    photoId: RoverPhoto;
};

export const Photo: React.FC<PhotoProperties> = ({ photo }) => {
    return (
        <div className={style.descriptionBox}>
            <HeartIcon photoId={photo.id} />
            <img className={style.marsPhotos} src={photo.imgSrc} alt={photo.cameraFullName}/>
            <span className={style.photoDescription}>Rover: {photo.roverName}, Camera: {photo.cameraFullName}</span>
        </div>
    );
};

export const PhotoGrid: React.FC<GridProperties> = ({ photos, onEmpty }) => {
    const renderGrid = () => {
        return (
            <div className={style.photoGrid}>
                {photos.map((p) => {
                    return <Photo key={p.id} photo={p} />
                })}
            </div>
        );
    };

    return photos.length ? renderGrid() : <>{onEmpty}</>;
};

export const Photos: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedSol = useAppSelector(getSelectedSol);
    const selectPhotos = createSelector(
        getSelectedSol,
        getSols,
        getPhotos,
        (selectedSol, sols, photos) => {
            const photoIds = sols[selectedSol];
            if (photoIds === undefined) {
                return null;
            }

            return photos.filter((p: { id: any; }) => photoIds.includes(p.id));
        }
    );
    const photos = useAppSelector(selectPhotos);

    const updateSelectedSol = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            dispatch(changeSol(Number(event.target.value)));
        }
    };

    const renderPhotoGrid = () => {
        if (!photos) {
            return "No photos loaded!";
        } else {
            return (
                <PhotoGrid
                    photos={photos}
                    onEmpty="No photos available!"
                />
            );
        }
    };

    return (
        <>
            <div className={style.marsViewer}>
                <p>Select a Sol number and press the "Load" button!</p>
                <input className={style.sols} type="number" value={selectedSol} onChange={updateSelectedSol} />
                <button onClick={() => dispatch(getSol(selectedSol))}>Load</button>
            </div>
            {renderPhotoGrid()}
        </>
    );
};

export const HeartIcon: React.FC<HeartProperties> = ({ photoId }) => {
    const dispatch = useAppDispatch();

    const favourites = useAppSelector(getPhotoIds);
    const setFavourite = favourites.includes(photoId);

    const action = setFavourite ? removeFromFavourites : addToFavourites;
    const opacity = setFavourite ? style.opacity : style.transparency;

    return (
        <svg onClick={() => dispatch(action(photoId))} className={`${style.heartIcon} ${opacity}`} width="98" height="89" viewBox="0 0 98 89" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.7"><path d="M89.834 48.974L48.81 8.95 7.786 48.974 48.81 89l41.023-40.026z" fill="#E30A17"></path><path d="M59.467 29.381c0 16.022-13.312 29.01-29.733 29.01C13.311 58.391 0 45.403 0 29.381 0 13.36 13.312.371 29.733.371c16.422 0 29.734 12.989 29.734 29.01z" fill="#E30A17"></path><path d="M98 29.01c0 16.022-13.312 29.01-29.734 29.01-16.42 0-29.733-12.988-29.733-29.01C38.533 12.988 51.845 0 68.266 0 84.688 0 98 12.988 98 29.01z" fill="#E30A17"></path></svg>
    );
};

export const Favourites: React.FC = () => {
    const selectPhotos = createSelector(
        getPhotoIds,
        getPhotos,
        (photoIds, photos) => {
            return photos.filter((p: { id: number; }) => photoIds.includes(p.id));
        }
    );

    const photos = useAppSelector(selectPhotos);

    return (
        <PhotoGrid
            photos={photos}
            onEmpty="No favourite photos added yet!"
        />
    )
};
