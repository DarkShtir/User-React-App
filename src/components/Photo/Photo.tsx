import React from 'react';
import classes from './Photo.module.scss';

interface Props {
	src: string;
	name?: string;
	// onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	alt: string;
}

const Photo: React.FC<Props> = ({ src, name = 'My Photo', alt }) => {
	return (
		<div className={classes.Photo}>
			<img src={src} alt={alt} />
			<h5> {name}</h5>
		</div>
	);
};

export default Photo;
