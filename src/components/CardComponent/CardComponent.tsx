import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@material-ui/core';
import classes from './CardComponent.module.scss';

const CardComponent = (): JSX.Element => {
	return (
		<Card className={classes.CardComponent}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					New Word of the Day
				</Typography>
				<Typography variant="h5" component="h2">
					Some text
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					adjective
				</Typography>
				<Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={classes.button} size="small">
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
};

export default CardComponent;
