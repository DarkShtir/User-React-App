import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import { connect } from 'react-redux';

import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import loadingEnum from '../../components/utils/loadingStateEnum';
import checkVoidObject from '../../components/utils/checkVoidObject';
import Loading from '../../components/shared/Loading/Loading';
import { RootState } from '../../store/interfaces/RootState';
import { Photo as PhotoInterface } from '../../interfaces';

import classes from './AlbumContainer.module.scss';

interface Props {
	statusApp: loadingEnum;
	photos: [PhotoInterface];
	setCountOfPhotos: (countOfPhotos: number) => void;
}

const AlbumContainer: React.FC<Props> = ({
	statusApp,
	photos,
	setCountOfPhotos,
}) => {
	const [currentPhoto, setCurrentPhoto] = useState<any>();
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	useEffect(() => {
		if (!checkVoidObject(photos[0])) {
			const newPhotos = photos.map(photo => {
				return {
					src: photo.src,
					width: photo.width,
					height: photo.height,
				};
			});
			if (photos[0].totalCount) {
				setCountOfPhotos(photos[0].totalCount[0]);
			}
			if (newPhotos && newPhotos.length > 0) {
				setCurrentPhoto(newPhotos);
			}
		}
	}, [photos, setCountOfPhotos]);

	const closeLightbox = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		if (event.currentTarget === event.target) {
			setCurrentImage(0);
			setViewerIsOpen(false);
		}
	};

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const nextImage = (): void => {
		if (photos !== null && currentImage < photos.length - 1) {
			const newCurrentImage = currentImage + 1;
			setCurrentImage(newCurrentImage);
		} else {
			setCurrentImage(0);
		}
	};

	switch (statusApp) {
		case loadingEnum.Error:
			return <ErrorIndicator error={null} />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			if (photos.length && currentPhoto !== undefined) {
				return (
					<div className={classes.AlbumContainer}>
						<div className={classes.gallery}>
							<Gallery
								photos={currentPhoto}
								onClick={openLightbox}
								targetRowHeight={50}
								limitNodeSearch={3}
							/>
						</div>
						{viewerIsOpen ? (
							<div
								className={classes.wrapperModalWindow}
								onClick={closeLightbox}
							>
								<img
									src={photos[currentImage].src}
									alt="Album photograhpy"
									onClick={nextImage}
									className={classes.photo}
								/>
							</div>
						) : null}
					</div>
				);
			} else {
				return (
					<div className={classes.galleryMessage}>
						<h3>Фотографий пока нету!</h3>
					</div>
				);
			}
	}
};

const mapStateToProps = (state: RootState) => ({
	statusApp: state.appState.statusApp,
	photos: state.albums.photos,
});

export default connect(mapStateToProps)(AlbumContainer);
