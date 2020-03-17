import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { Typography, Button } from '@material-ui/core';
import classes from './AlbumsPage.module.scss';

import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';
import { RootState } from '../../store/interfaces/RootState';
import { Album } from '../../interfaces';
import {
	addUserAlbum,
	deleteUserAlbum,
} from '../../store/albums/albums.actions';

interface Props {
	id: string;
	albums: [Album] | null;
	guest: boolean;
	addUserAlbum: (ownerId: string) => void;
	deleteUserAlbum: (albumId: string) => void;
}

const AlbumsPage: React.FC<Props> = ({
	id,
	albums,
	guest,
	addUserAlbum,
	deleteUserAlbum,
}) => {
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
							addUserAlbum(id);
						}}
					>
						ADD
					</Button>
				</>
			)}

			{albums && albums.length > 0 ? (
				<div className={classes.albumWrapper}>
					{albums.map((album: any, index: number) => {
						return (
							<div key={index} className={classes.wrapper}>
								<AlbumFolder album={album} />
								<Button
									color="secondary"
									onClick={() => {
										deleteUserAlbum(album._id);
									}}
								>
									DELETE
								</Button>
							</div>
						);
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
	addUserAlbum: (ownerId: string) => dispatch(addUserAlbum(ownerId)),
	deleteUserAlbum: (albumId: string) => dispatch(deleteUserAlbum(albumId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);
