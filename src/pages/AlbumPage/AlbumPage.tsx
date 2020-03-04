import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import classes from './AlbumPage.module.scss';
import Photo from '../../components/Photo/Photo';
import Previews from '../../components/Previews/Previews';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Action, Dispatch } from 'redux';
import {
	getAlbumPhotos,
	putActiveAlbum,
} from '../../store/users/users.actions';
import { Photo as PhotoInterface } from '../../interfaces';
// import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
// import Loading from '../../components/shared/Loading/Loading';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
	photos: [PhotoInterface];
	activeAlbum: string;
	guest: boolean;
	getAlbumPhotos: (albumId: string) => void;
	putActiveAlbum: (albumId: string) => void;
}

const AlbumPage: React.FC<Props & RouteComponentProps> = ({
	photos,
	activeAlbum,
	getAlbumPhotos,
	putActiveAlbum,
	guest,
	...props
}) => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);
	const [loading, setLoading] = useState(loadingEnum.Loading);
	const [currentPhoto, setCurrentPhoto] = useState<any>();

	useEffect(() => {
		if (activeAlbum) {
			getAlbumPhotos(activeAlbum);
		} else {
			putActiveAlbum(props.match.url.slice(7));
		}
	}, [getAlbumPhotos, activeAlbum, props.match.url, putActiveAlbum]);

	const checkVoidObject = (obj: object): boolean => {
		for (const key in obj) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (!checkVoidObject(photos[0])) {
			const newPhotos = photos.map(photo => {
				return {
					src: photo.src,
					width: photo.width,
					height: photo.height,
				};
			});
			if (newPhotos && newPhotos.length > 0) {
				setCurrentPhoto(newPhotos);
				setLoading(loadingEnum.Loaded);
			}
		}
	}, [photos, loadingEnum.Loaded]);

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		if (event.currentTarget === event.target) {
			setCurrentImage(0);
			setViewerIsOpen(false);
		}
	};

	const nextImage = (): void => {
		if (photos !== null && currentImage < photos.length - 1) {
			const newCurrentImage = currentImage + 1;
			setCurrentImage(newCurrentImage);
		} else {
			setCurrentImage(0);
		}
	};

	return (
		<div className={classes.AlbumPage}>
			{guest ? null : <Previews />}
			{loading === loadingEnum.Loaded ? (
				<Gallery photos={currentPhoto} onClick={openLightbox} />
			) : null}
			{viewerIsOpen ? (
				<div className={classes.wrapperModalWindow} onClick={closeLightbox}>
					<div onClick={nextImage} className={classes.wrapperPhoto}>
						<Photo src={photos[currentImage].src} alt="Album photograhpy" />
					</div>
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	photos: state.users.photos,
	activeAlbum: state.users.activeAlbum,
	guest: state.users.guest,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getAlbumPhotos: (albumId: string) => dispatch(getAlbumPhotos(albumId)),
	putActiveAlbum: (albumId: string) => dispatch(putActiveAlbum(albumId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
