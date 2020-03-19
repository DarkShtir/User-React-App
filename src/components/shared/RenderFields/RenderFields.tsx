import React from 'react';
import classes from './RenderFields.module.scss';
import { ListItem, ListItemText } from '@material-ui/core';

interface Props {
	cardForm: { [index: string]: string };
	user: { [index: string]: any };
}

const RenderFields: React.FC<Props> = ({ cardForm, user }): any => {
	return Object.keys(cardForm).map(
		(fieldName: string, index): void | JSX.Element => {
			const property = user[fieldName];
			return (
				<div className={classes.RenderFields} key={fieldName + index}>
					<ListItem className={classes.listItem}>
						<ListItemText primary={property} secondary={cardForm[fieldName]} />
					</ListItem>
				</div>
			);
		}
	);
};

export default RenderFields;
