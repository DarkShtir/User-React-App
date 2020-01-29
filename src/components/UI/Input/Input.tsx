import React from 'react';
import classes from './Input.module.scss';

type InputProps = {
	type?: string,
	value: string | number,
	label: string,
	// onChange: any,
	// errorMessage: any,
};

const Input = (props: InputProps): JSX.Element => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;
	const cls = [classes.Input, 'input-field col s12'];
	console.log(cls);
	return (
		<div className="row">
			<div className={cls.join(' ')}>
				<label htmlFor={htmlFor}>{props.label}</label>
				<input id={htmlFor} type={inputType} />
			</div>
		</div>
	);
};

export default Input;
