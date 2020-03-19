import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import AlbumContainer from '../../containers/Album/AlbumContainer';
import PreviewsAndDownload from '../../components/PreviewsAndDownload/PreviewsAndDownload';
import Pagination from '../../components/Pagination/Pagination';
import { RootState } from '../../store/interfaces/RootState';
import {
	getAlbumPhotos,
	putActiveAlbum,
} from '../../store/albums/albums.actions';

import classes from './AlbumPage.module.scss';

interface Props {
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
	activeAlbum,
	guest,
	getAlbumPhotos,
	putActiveAlbum,
	...props
}) => {
	const [elemPerPage, setElemPerPage] = useState(5);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState(false);
	const [lastPage, setLastPage] = useState(false);
	const [firstPage, setFirstPage] = useState(true);
	const [needAdd, setNeedAdd] = useState(false);
	const [countOfPhotos, setCountOfPhotos] = useState(0);

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

	const handleSelect = (event: React.ChangeEvent<{ value: number }>) => {
		const newPage = (elemPerPage * page - elemPerPage) / event.target.value;
		setElemPerPage(event.target.value);
		if (newPage < 1) {
			setPage(1);
		} else if (
			Math.ceil(newPage) * event.target.value >= countOfPhotos ||
			newPage < Math.ceil(newPage)
		) {
			setPage(Math.round(newPage));
		} else {
			setPage(Math.ceil(newPage) + 1);
		}
	};

	useEffect(() => {
		if (page > 1) {
			setFirstPage(false);
		} else if (page === 1) {
			setFirstPage(true);
		}
	}, [page]);

	useEffect(() => {
		if (elemPerPage * page < countOfPhotos) {
			setLastPage(false);
		} else {
			setLastPage(true);
		}
	}, [countOfPhotos, elemPerPage, page]);

	const pageInfo = {
		elemPerPage: elemPerPage,
		page: page,
		firstPage: firstPage,
		lastPage: lastPage,
		countOfPhotos: countOfPhotos,
		setPage: setPage,
		filter: filter,
		setFilter: setFilter,
	};

	return (
		<div className={classes.AlbumPage}>
			{needAdd ? <PreviewsAndDownload /> : null}

			<Pagination
				pageInfo={pageInfo}
				guest={guest}
				needAdd={needAdd}
				handleSelect={handleSelect}
				setNeedAdd={setNeedAdd}
			/>
			<AlbumContainer setCountOfPhotos={setCountOfPhotos} />
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	activeAlbum: state.albums.activeAlbum,
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
