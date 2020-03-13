import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { Action, Dispatch } from 'redux';
import classes from './AlbumsPage.module.scss';

import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';
import { RootState } from '../../store/interfaces/RootState';
import { Album } from '../../interfaces';
import { addUserAlbums } from '../../store/albums/albums.actions';

interface Props {
	id: string;
	albums: [Album] | null;
	guest: boolean;
	addUserAlbums: (ownerId: string) => void;
}

const AlbumsPage: React.FC<Props> = ({ id, albums, guest, addUserAlbums }) => {
	return (
		<div className={classes.AlbumsPage}>
			<Typography variant="h5" className={classes.typography}>
				My albums
			</Typography>
			{guest ? null : (
				<>
					<Button
						color="primary"
						onClick={() => {
							addUserAlbums(id);
						}}
					>
						ADD
					</Button>
					<Button color="default">EDIT</Button>
					<Button color="secondary">DELETE</Button>
				</>
			)}

			{albums && albums.length > 0 ? (
				<div className={classes.albumWrapper}>
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
const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	albums: state.albums.albumsList,
	guest: state.users.guest,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	addUserAlbums: (ownerId: string) => dispatch(addUserAlbums(ownerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);
