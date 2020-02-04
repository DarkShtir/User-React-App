import React from 'react';
import { User } from '../../interfaces';
import Input from '../UI/Input/Input';
import { Button } from '@material-ui/core';
import classes from './Form.module.scss';

interface Props {
	user: User;
	inputHandler: (value: string, fieldName: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formType?: string;
}

const Form: React.FC<Props> = ({
	user,
	inputHandler,
	onSubmit,
	formType = 'add',
}) => {
	const renderInputField = (formType: string): object => {
		const unusedFields = ['_id'];
		let cls: [string];
		if (formType === 'edit') {
			unusedFields.push('login', 'password', '__v', 'tokens');
			cls = ['active'];
		}
		return Object.keys(user).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				if (!unusedFields.includes(fieldName)) {
					return (
						<React.Fragment key={fieldName + index}>
							<Input
								className={cls}
								value={user}
								label={fieldName}
								type={
									fieldName === 'password'
										? fieldName
										: fieldName === 'phone'
										? 'tel'
										: ''
								}
								onChange={(event): void => {
									inputHandler(event.target.value, fieldName);
								}}
							/>
						</React.Fragment>
					);
				}
			}
		);
	};

	if (formType === 'edit') {
		return (
			<form onSubmit={onSubmit} className={classes.Form}>
				{renderInputField(formType)}
				<Button color="primary" variant="outlined" type="submit">
					Save Changes
				</Button>
			</form>
		);
	} else {
		return (
			<form className={classes.Form} onSubmit={onSubmit}>
				{renderInputField(formType)}
				<Button color="primary" variant="outlined" type="submit">
					Add
				</Button>
			</form>
		);
	}
};

export default Form;
