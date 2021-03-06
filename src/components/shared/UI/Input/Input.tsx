import React from 'react';
import { TextField, Container } from '@material-ui/core';
import classes from './Input.module.scss';

type InputProps = {
	type?: string,
	targetObject: object | any,
	label: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	className?: any,
	fieldName: string,
};

const Input = (props: InputProps): JSX.Element => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;
	return (
		<Container>
			<TextField
				id={htmlFor}
				label={props.label}
				type={inputType}
				className={classes.Input}
				fullWidth
				margin="normal"
				variant="outlined"
				onChange={props.onChange}
				value={props.targetObject[props.fieldName]}
				required
			/>
		</Container>
	);
};

export default Input;
