import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import classes from './ErrorIndicator.module.scss';
interface Props {
	error: Error | null;
}
export const ErrorIndicator: React.FC<Props> = (props): JSX.Element => {
	if (props.error && props.error !== null) {
		return (
			<Paper elevation={3} className={classes.ErrorIndicator}>
				<Typography variant="h4">
					{/* Ooops! Что-то пошло не так! наверное что-то сломалось!! */}
					{props.error.message}
				</Typography>
			</Paper>
		);
	} else {
		return (
			<Paper elevation={3} className={classes.ErrorIndicator}>
				<Typography variant="h4">
					Ooops! Что-то пошло не так! наверное что-то сломалось!!
				</Typography>
			</Paper>
		);
	}
};
