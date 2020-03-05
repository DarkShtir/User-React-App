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
import { RouteComponentProps } from 'react-router-dom';
import {
	Checkbox,
	Button,
	FormControl,
	InputLabel,
	Select,
	FormControlLabel,
} from '@material-ui/core';

interface Props {
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
		if (loading === loadingEnum.Loaded) {
			if (currentPhoto.length === +elemPerPage && photos.length > 0) {
				setLastPage(false);
			} else {
				setLastPage(true);
			}
		}
	}, [currentPhoto, elemPerPage, photos.length, loading, loadingEnum.Loaded]);

	return (
		<div className={classes.AlbumPage}>
			{needAdd ? <Previews /> : null}
			{loading === loadingEnum.Loaded ? (
				<>
					<div className={classes.paginationPanel}>
						<FormControl variant="filled" className={classes.formControl}>
							<InputLabel htmlFor="select-elements-per-page">
								К-во элементов
							</InputLabel>
							<Select
								className={classes.select}
								native
								value={elemPerPage}
								onChange={(event: any) => {
									handleSelect(event);
								}}
								inputProps={{
									name: 'elementsPerPage',
								}}
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={20}>20</option>
							</Select>
						</FormControl>

						<Button
							disabled={firstPage}
							className={classes.pageButton}
							variant="contained"
							onClick={
								!firstPage
									? () => {
											setPage(page - 1);
									  }
									: () => {
											setPage(page);
									  }
							}
						>
							Prev
						</Button>
						<Button
							disabled={lastPage}
							className={classes.pageButton}
							variant="contained"
							onClick={
								!lastPage
									? () => {
											setPage(page + 1);
									  }
									: () => {
											setPage(page);
									  }
							}
						>
							Next
						</Button>
						<FormControlLabel
							className={classes.checkbox}
							control={
								<Checkbox
									checked={filter}
									onChange={() => {
										setFilter(!filter);
										setPage(1);
									}}
									color="primary"
								/>
							}
							label="Показать только квадратные фото"
						/>
						{guest ? null : (
							<Button
								className={classes.pageButton}
								variant="contained"
								onClick={() => {
									setNeedAdd(!needAdd);
								}}
							>
								{!needAdd ? 'Добавить фото' : 'Скрыть панель'}
							</Button>
						)}
					</div>
					<div className={classes.gallery}>
						<Gallery
							photos={currentPhoto}
							onClick={openLightbox}
							targetRowHeight={50}
							limitNodeSearch={3}
						/>
					</div>
				</>
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
	getAlbumPhotos: (
		albumId: string,
		page: number,
		elemPerPage: number,
		filter: boolean
	) => dispatch(getAlbumPhotos(albumId, page, elemPerPage, filter)),
	putActiveAlbum: (albumId: string) => dispatch(putActiveAlbum(albumId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
