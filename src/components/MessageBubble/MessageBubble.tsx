import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import classes from './MessageBubble.module.scss';

interface Props {
	// ref: any;
	value: string;
	yourMessage: boolean;
	owner: string;
}

const MessageBubble: React.FC<Props> = ({ value, yourMessage, owner }) => {
	let customClasses = '';
	if (yourMessage) {
		customClasses = `${classes.MessageBubble} ${classes.yourMessage}`;
	} else {
		customClasses = `${classes.MessageBubble} ${classes.message}`;
	}
	return (
		<Paper elevation={24} className={customClasses}>
			<Typography className={classes.owner}>{owner}</Typography>
			<Typography className={classes.messageValue}>{value}</Typography>
		</Paper>
	);
};

export default MessageBubble;
