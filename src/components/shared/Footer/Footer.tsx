import React from 'react';
import classes from './Footer.module.scss';
import { Paper, Typography } from '@material-ui/core';

const Footer = (): JSX.Element => {
	return (
		<Paper className={classes.Footer}>
			<Typography variant="h6" className={classes.message}>
				FOOOTER
			</Typography>
		</Paper>
	);
};

export default Footer;
