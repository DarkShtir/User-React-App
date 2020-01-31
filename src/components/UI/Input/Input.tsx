import React from 'react';
import classes from './Input.module.scss';

type InputProps = {
	type?: string,
	value: object | any,
	label: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	className?: any,
	// errorMessage: any,
};

const Input = (props: InputProps): JSX.Element => {
	console.log(props.value);
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;
	const cls = [classes.Input, 'input-field col s12'];
	return (
		<div className="row">
			<div className={cls.join(' ')}>
				<label htmlFor={htmlFor} className={props.className}>
					{props.label}
				</label>
				<input
					id={htmlFor}
					type={inputType}
					onChange={props.onChange}
					value={props.value[props.label]}
					required
				/>
			</div>
		</div>
	);
};

export default Input;
