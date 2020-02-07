import React from 'react';
import classes from './Input.module.scss';
import { TextField, Container } from '@material-ui/core';

type InputProps = {
	type?: string,
	targetObject: object | any,
	label: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	className?: any,
	fieldName: string,
	// errorMessage: any,
};

const Input = (props: InputProps): JSX.Element => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;
	const cls = [classes.Input, 'input-field col s12'];
	return (
		//! <div className="row">
		//! 	<div className={cls.join(' ')}>
		//! 		<label htmlFor={htmlFor} className={props.className}>
		//! 			{props.label}
		//! 		</label>
		//! 		<input
		//! 			id={htmlFor}
		//! 			type={inputType}
		//! 			onChange={props.onChange}
		//! 			value={props.value[props.label]}
		//! 			required
		//! 		/>
		//! 	</div>
		//! </div>
		<Container>
			<TextField
				id={htmlFor}
				label={props.label}
				type={inputType}
				className={cls.join(' ')}
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
