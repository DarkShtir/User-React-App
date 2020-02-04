import React from 'react';
import classes from './Header.module.scss';

const Header = (): JSX.Element => {
	return (
		<div className={classes.Header}>
			<span>My Header</span>
		</div>
	);
};

export default Header;
