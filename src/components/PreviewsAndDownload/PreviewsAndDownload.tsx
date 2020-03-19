import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { RootState } from '../../store/interfaces/RootState';
import { loading } from '../../store/appState/appState.actions';
import { uploadPhotos } from '../../store/albums/albums.actions';

import classes from './PreviewsAndDownload.module.scss';

interface Props {
	id: string;
	activeAlbum: string;
	uploadPhotos: (ownerId: string, albumId: string, photos: any) => void;
}

const PreviewsAndDownload: React.FC<Props> = ({
	id,
	activeAlbum,
	uploadPhotos,
	...props
}) => {
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles: any) => {
			setFiles(
				acceptedFiles.map((file: any) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const submitHandler = (event: any) => {
		event.preventDefault();
		if (files) {
			loading();
			uploadPhotos(id, activeAlbum, files);
		}
		setFiles([]);
	};

	const cancelHandler = (event: any) => {
		setFiles([]);
	};

	const thumbs = files.map((file: any) => (
		<div className={classes.thumb} key={file.name}>
			<div className={classes.thumbInner}>
				<img src={file.preview} className={classes.img} alt="Gallery-element" />
			</div>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file: any) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<section className={classes.PreviewsAndDownload}>
			<div className={classes.controlWrapper}>
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p
							className={classes.dragAreaActive}
						>{`О, файлики! Отпускай клавишу мыши`}</p>
					) : (
						<p className={classes.dragArea}>
							Жмякни тута, или кинь файлы сюды!
						</p>
					)}
				</div>
				<Button
					variant="contained"
					type="submit"
					onClick={submitHandler}
					className={(classes.button, classes.submit)}
				>
					Send
				</Button>
				<Button
					variant="contained"
					type="submit"
					onClick={cancelHandler}
					className={(classes.button, classes.cancel)}
				>
					Cancel
				</Button>
			</div>

			<aside className={classes.thumbsContainer}>{thumbs}</aside>
		</section>
	);
};

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	activeAlbum: state.albums.activeAlbum,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	uploadPhotos: (ownerId: string, albumId: string, photos: any) =>
		dispatch(uploadPhotos(ownerId, albumId, photos)),
	loading: () => {
		dispatch(loading());
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreviewsAndDownload);
