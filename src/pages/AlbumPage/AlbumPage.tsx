import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import Gallery from 'react-photo-gallery';
import { RouteComponentProps } from 'react-router-dom';

import classes from './AlbumPage.module.scss';
import Photo from '../../components/Photo/Photo';
import Previews from '../../components/Previews/Previews';
import Pagination from '../../components/Pagination/Pagination';
import { RootState } from '../../store/interfaces/RootState';
import {
	getAlbumPhotos,
	putActiveAlbum,
} from '../../store/users/users.actions';
import { Photo as PhotoInterface } from '../../interfaces';
import checkVoidObject from '../../components/utils/checkVoidObject';
import loadingEnum from '../../components/utils/loadingStateEnum';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import Loading from '../../components/shared/Loading/Loading';

interface Props {
	statusApp: loadingEnum;
	photos: [PhotoInterface];
	activeAlbum: string;
	guest: boolean;
	getAlbumPhotos: (
		albumId: string,
		page: number,
		elemPerPage: number,
		filter: boolean
	) => void;
	putActiveAlbum: (albumId: string) => void;
}

const AlbumPage: React.FC<Props & RouteComponentProps> = ({
	statusApp,
	photos,
	activeAlbum,
	getAlbumPhotos,
	putActiveAlbum,
	guest,
	...props
}) => {
	// enum loadingEnum {
	// 	Loading,
	// 	Loaded,
	// 	Error,
	// }
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);
	// const [loading, setLoading] = useState(loadingEnum.Loading);
	const [currentPhoto, setCurrentPhoto] = useState<any>();
	const [elemPerPage, setElemPerPage] = useState(5);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState(false);
	const [lastPage, setLastPage] = useState(false);
	const [firstPage, setFirstPage] = useState(true);
	const [needAdd, setNeedAdd] = useState(false);

	useEffect(() => {
		if (activeAlbum) {
			getAlbumPhotos(activeAlbum, page, elemPerPage, filter);
		} else {
			putActiveAlbum(props.match.url.slice(7));
		}
	}, [
		getAlbumPhotos,
		activeAlbum,
		props.match.url,
		putActiveAlbum,
		page,
		elemPerPage,
		filter,
	]);

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
			}
		}
	}, [photos]);

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

	const handleSelect = (event: React.ChangeEvent<{ value: number }>) => {
		setElemPerPage(event.target.value);
		setPage(1);
	};

	useEffect(() => {
		if (page > 1) {
			setFirstPage(false);
		} else if (page === 1) {
			setFirstPage(true);
		}
	}, [page]);

	useEffect(() => {
		if (
			currentPhoto &&
			currentPhoto.length === +elemPerPage &&
			photos.length > 0
		) {
			setLastPage(false);
		} else {
			setLastPage(true);
		}
	}, [currentPhoto, elemPerPage, photos.length]);

	const pageInfo = {
		elemPerPage: elemPerPage,
		page: page,
		firstPage: firstPage,
		lastPage: lastPage,
		setPage: setPage,
		filter: filter,
		setFilter: setFilter,
	};

	return (
		<div className={classes.AlbumPage}>
			{needAdd ? <Previews /> : null}

			<Pagination
				pageInfo={pageInfo}
				guest={guest}
				needAdd={needAdd}
				handleSelect={handleSelect}
				setNeedAdd={setNeedAdd}
			/>
			{statusApp === loadingEnum.Error ? <ErrorIndicator error={null} /> : null}
			{statusApp === loadingEnum.Loading ? <Loading /> : null}
			{statusApp === loadingEnum.Loaded ? (
				<div className={classes.gallery}>
					<Gallery
						photos={currentPhoto}
						onClick={openLightbox}
						targetRowHeight={50}
						limitNodeSearch={3}
					/>
				</div>
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
	statusApp: state.users.statusApp,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getAlbumPhotos: (
		albumId: string,
		page: number,
		elemPerPage: number,
		filter: boolean
	) => dispatch(getAlbumPhotos(albumId, page, elemPerPage, filter)),
	putActiveAlbum: (albumId: string) => dispatch(putActiveAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
