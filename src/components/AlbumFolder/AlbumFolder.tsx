import React from 'react';
import classes from './AlbumFolder.module.scss';
import { Album } from '../../interfaces';

interface Props {
	album: Album;
}

const AlbumFolder: React.FC<Props> = ({ album }) => {
	return (
		<div
			className={classes.AlbumFolder}
			onClick={() => {
				console.log(album._id);
			}}
		>
			<img
				src={
					album.previewUrl ||
					'http://localhost:8080/static/default_album-1582707016442.svg'
				}
				alt="Album cover"
			/>
		</div>
	);
};

export default AlbumFolder;
