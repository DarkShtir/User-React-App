import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import classes from './AlbumPage.module.scss';
import Photo from '../../components/Photo/Photo';

const photos = [
	{
		src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
		width: 4,
		height: 3,
	},
	{
		src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
		width: 1,
		height: 1,
	},
	{
		src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
		width: 3,
		height: 4,
	},
	{
		src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
		width: 3,
		height: 4,
	},
	{
		src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
		width: 3,
		height: 4,
	},
	{
		src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
		width: 4,
		height: 3,
	},
	{
		src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
		width: 3,
		height: 4,
	},
	{
		src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
		width: 4,
		height: 3,
	},
	{
		src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
		width: 4,
		height: 3,
	},
	{
		src: 'https://source.unsplash.com/XiDA78wAZVw/600x799',
		width: 3,
		height: 4,
	},
];

const AlbumPage: React.FC = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

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
		if (currentImage < photos.length - 1) {
			console.log(currentImage);
			console.log(photos.length);
			const newCurrentImage = currentImage + 1;
			setCurrentImage(newCurrentImage);
		} else {
			setCurrentImage(0);
		}
	};

	return (
		<div className={classes.AlbumPage}>
			<Gallery photos={photos} onClick={openLightbox} />
			{viewerIsOpen ? (
				<div className={classes.wrapperModalWindow} onClick={closeLightbox}>
					<div onClick={nextImage}>
						<Photo src={photos[currentImage].src} alt="Album photograhpy" />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default AlbumPage;
