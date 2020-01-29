import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
	type: any;
	onClick: any;
	disabled: any;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	const cls = [classes.Button, classes[props.type]];
	return (
		<button
			onClick={props.onClick}
			className={cls.join(' ')}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
