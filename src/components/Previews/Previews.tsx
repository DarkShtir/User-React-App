import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './Previews.module.scss';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Action, Dispatch } from 'redux';
import { uploadPhotos } from '../../store/users/users.actions';

interface Props {
	id: string;
	activeAlbum: string;
	uploadPhotos: (ownerId: string, albumId: string, photos: any) => void;
}

const Previews: React.FC<Props> = ({
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
			uploadPhotos(id, activeAlbum, files);
		}
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
		<section className={classes.container}>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className={classes.dragAreaActive}>{`Drop it like it's hot!`}</p>
				) : (
					<p className={classes.dragArea}>Click me or drag a file to upload!</p>
				)}
			</div>

			<aside className={classes.thumbsContainer}>{thumbs}</aside>
			<Button variant="contained" type="submit" onClick={submitHandler}>
				Send
			</Button>
		</section>
	);
};

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	activeAlbum: state.users.activeAlbum,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	uploadPhotos: (ownerId: string, albumId: string, photos: any) =>
		dispatch(uploadPhotos(ownerId, albumId, photos)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Previews);
