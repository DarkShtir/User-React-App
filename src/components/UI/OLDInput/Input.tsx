import React from 'react';
import classes from './Input.module.scss';

// type isInvalidProps = {
// 	valid: any,
// 	touched: any,
// 	shouldValidate: any,
// };

function isInvalid({ valid, touched, shouldValidate }: any): boolean {
	return !valid && shouldValidate && touched;
}

type InputProps = {
	type: any,
	value: any,
	label: string,
	onChange: any,
	errorMessage: any,
};

const Input: React.FC<InputProps> = (props: InputProps) => {
	const inputType = props.type || 'text';
	const cls = [classes.Input];
	const htmlFor = `${inputType}-${Math.random()}`;

	if (isInvalid(props)) {
		cls.push(classes.invalid);
	}
	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>

			{isInvalid(props) ? (
				<span>{props.errorMessage || 'Введите верное значение'}</span>
			) : null}
		</div>
	);
};

export default Input;
