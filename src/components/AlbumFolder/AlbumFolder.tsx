import React from 'react';
import { useHistory } from 'react-router-dom';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Album } from '../../interfaces';
import { RootState } from '../../store/interfaces/RootState';
import { putActiveAlbum } from '../../store/albums/albums.actions';

import classes from './AlbumFolder.module.scss';

interface Props {
	album: Album;
	activeAlbum: string;
	putActiveAlbum: (albumId: string) => void;
}

const AlbumFolder: React.FC<Props> = ({
	album,
	activeAlbum,
	putActiveAlbum,
}) => {
	const history = useHistory();

	return (
		<div
			className={classes.AlbumFolder}
			onClick={() => {
				if (album._id && album._id !== activeAlbum) {
					putActiveAlbum(album._id);
					history.push(`/album/${album._id}`);
				} else if (album._id === activeAlbum) {
					history.push(`/album/${album._id}`);
				}
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

const mapStateToProps = (state: RootState) => ({
	activeAlbum: state.albums.activeAlbum,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	putActiveAlbum: (albumId: string) => dispatch(putActiveAlbum(albumId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumFolder);
