import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './Previews.module.scss';
import { Button } from '@material-ui/core';

const Previews: React.FC = props => {
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps } = useDropzone({
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
		console.log(files);
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
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p className={classes.dragArea}>
					Drag n drop some files here, or click to select files
				</p>
			</div>

			<aside className={classes.thumbsContainer}>{thumbs}</aside>
			<Button variant="contained" type="submit" onClick={submitHandler}>
				Send
			</Button>
		</section>
	);
};

export default Previews;
