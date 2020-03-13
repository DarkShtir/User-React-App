import React from 'react';
import classes from './CardAlbum.module.scss';
import AlbumFolder from '../AlbumFolder/AlbumFolder';
import { Typography, Button } from '@material-ui/core';
import { Album } from '../../interfaces';
import { useHistory } from 'react-router-dom';

interface Props {
	albums: [Album];
}

const CardAlbum: React.FC<Props> = ({ albums }) => {
	const history = useHistory();

	return (
		<div className={classes.CardAlbum}>
			<Typography variant="h5" className={classes.typography}>
				My albums
			</Typography>

			{albums && albums.length > 0 ? (
				<div className={classes.albumFolders}>
					{albums.map((album: Album, index: number) => {
						return <AlbumFolder album={album} key={index} />;
					})}
				</div>
			) : (
				<h4>Альбомов пока нету!</h4>
			)}
			<Button
				variant="outlined"
				onClick={() => {
					history.push('/albums');
				}}
			>
				Войти в альбомы
			</Button>
		</div>
	);
};

export default CardAlbum;
