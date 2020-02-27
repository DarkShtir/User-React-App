import React, { useState, useContext, useEffect, useCallback } from 'react';
import classes from './AlbumsPage.module.scss';
import albumService from '../../services/album-service';
// import { Album } from '../../interfaces';

import { isLoginContext } from '../../components/utils/state';
import { Typography } from '@material-ui/core';
import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';

const AlbumsPage: React.FC = () => {
	const { id } = useContext<any>(isLoginContext);
	const [albums, setAlbums] = useState([]);

	const getAlbum = useCallback(async id => {
		try {
			const albums = await albumService.getAllAlbumByUserId(id);
			if (albums) {
				setAlbums(albums);
			}
			console.log(albums);
		} catch (error) {
			throw new Error('Альбома не найдено!');
		}
	}, []);

	// const addAlbum = async (newAlbum: Album) => {
	// 	await albumService.addAlbum(newAlbum);
	// 	getAlbum(id);
	// };

	useEffect(() => {
		getAlbum(id);
	}, [getAlbum, id]);

	return (
		<div className={classes.AlbumsPage}>
			<Typography variant="h5" className={classes.typography}>
				My albums
			</Typography>

			{albums && albums.length > 0 ? (
				<div>
					{albums.map((album: any, index: number) => {
						return <AlbumFolder album={album} key={index} />;
					})}
				</div>
			) : (
				<h4>Альбомов пока нету!</h4>
			)}
		</div>
	);
};

export default AlbumsPage;
