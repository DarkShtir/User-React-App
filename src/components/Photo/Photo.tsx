import React from 'react';
import classes from './Photo.module.scss';

interface Props {
	src: string;
	name?: string;
	alt: string;
}

const Photo: React.FC<Props> = ({ src, name = 'My Photo', alt }) => {
	return (
		<div className={classes.Photo}>
			<img src={src} alt={alt} />
		</div>
	);
};

export default Photo;
