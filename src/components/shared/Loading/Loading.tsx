import React from 'react';
import classes from './Loading.module.scss';

const Loading = (): JSX.Element => {
	return (
		<>
			<div className={classes.Loading}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</>
	);
};

export default Loading;
