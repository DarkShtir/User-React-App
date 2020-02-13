import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import classes from './ErrorIndicator.module.scss';

export const ErrorIndicator: React.FC = (): JSX.Element => {
	return (
		<Paper elevation={3} className={classes.ErrorIndicator}>
			<Typography variant="h4">
				Ooops! Что-то пошло не так! наверное что-то сломалось!!
			</Typography>
		</Paper>
	);
};
