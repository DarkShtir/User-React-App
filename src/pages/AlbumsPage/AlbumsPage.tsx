import React from 'react';
import classes from './AlbumsPage.module.scss';
// import albumService from '../../services/album-service';

// import { isLoginContext } from '../../components/utils/state';
import { Typography, Button } from '@material-ui/core';
import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Album } from '../../interfaces';
// import Input from '../../components/shared/UI/Input/Input';
import { addUserAlbums } from '../../store/users/users.actions';
import { Action, Dispatch } from 'redux';

interface Props {
	id: string;
	albums: [Album] | null;
	addUserAlbums: (ownerId: string) => void;
}

const AlbumsPage: React.FC<Props> = ({ id, albums, addUserAlbums }) => {
	// const { id } = useContext<any>(isLoginContext);
	// const [stateAlbums, setAlbums] = useState([]);

	// const getAlbum = useCallback(async id => {
	// 	try {
	// 		const stateAlbums = await albumService.getAllAlbumByUserId(id);
	// 		if (stateAlbums) {
	// 			setAlbums(stateAlbums);
	// 		}
	// 		console.log(stateAlbums);
	// 	} catch (error) {
	// 		throw new Error('Альбома не найдено!');
	// 	}
	// }, []);

	// const addAlbum = async (newAlbum: Album) => {
	// 	await albumService.addAlbum(newAlbum);
	// 	getAlbum(id);
	// };

	// useEffect(() => {
	// 	getAlbum(id);
	// }, [getAlbum, id]);

	return (
		<div className={classes.AlbumsPage}>
			<Typography variant="h5" className={classes.typography}>
				My albums
			</Typography>

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
	// guestId: state.users.guestId,
	// activeUser: state.users.activeUser,
	albums: state.users.albums,
	// pets: state.pets.pets,
	// editPet: state.pets.editPet,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	addUserAlbums: (ownerId: string) => dispatch(addUserAlbums(ownerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);
