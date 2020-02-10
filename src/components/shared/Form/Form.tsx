import React from 'react';
// import { User, UserLogin } from '../../../interfaces';
import Input from '../UI/Input/Input';
import { Button, ButtonGroup } from '@material-ui/core';
import classes from './Form.module.scss';
import { useHistory } from 'react-router-dom';

interface Props {
	user: { [value: string]: string | [] };
	inputHandler: (value: string, fieldName: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formType?: string;
}

interface TemplateForm {
	[value: string]: string;
}

const Form: React.FC<Props> = ({
	user,
	inputHandler,
	onSubmit,
	formType = 'add',
}) => {
	const history = useHistory();

	const userCreateForm = {
		login: 'Логин',
		password: 'Пароль',
		firstName: 'Имя',
		lastName: 'Фамилия',
		gender: 'Пол',
		nat: 'Национальность',
		phone: 'Телефон',
	};

	const userEditForm = {
		firstName: 'Имя',
		lastName: 'Фамилия',
		gender: 'Пол',
		nat: 'Национальность',
		phone: 'Телефон',
	};

	const userLoginForm = {
		login: 'Логин',
		password: 'Пароль',
	};

	const renderInputField = (
		formType: string,
		user: { [value: string]: any },
		templateForm: TemplateForm
	): object => {
		// const unusedFields = ['_id'];
		let cls: [string];
		if (formType === 'edit') {
			// unusedFields.push('login', 'password', '__v', 'tokens');
			cls = ['active'];
		}
		return Object.keys(templateForm).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				return (
					<React.Fragment key={fieldName + index}>
						<Input
							className={cls}
							targetObject={user}
							label={templateForm[fieldName]}
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
							fieldName={fieldName}
						/>
					</React.Fragment>
				);

				// if (!unusedFields.includes(fieldName)) {
				// 	return (
				// 		<React.Fragment key={users/${}fieldName + index}>
				// 			<Input
				// 				className={cls}
				// 				value={user}
				// 				label={fieldName}
				// 				type={
				// 					fieldName === 'password'
				// 						? fieldName
				// 						: fieldName === 'phone'
				// 						? 'tel'
				// 						: ''
				// 				}
				// 				onChange={(event): void => {
				// 					inputHandler(event.target.value, fieldName);
				// 				}}
				// 			/>
				// 		</React.Fragment>
				// 	);
				// }
			}
		);
	};

	if (formType === 'edit') {
		return (
			<form className={classes.Form} onSubmit={onSubmit}>
				{renderInputField(formType, user, userEditForm)}
				<ButtonGroup>
					<Button
						className={classes.button}
						color="primary"
						variant="outlined"
						type="submit"
					>
						Save Changes
					</Button>
					<Button
						className={classes.button}
						color="secondary"
						onClick={() => {
							history.goBack();
						}}
					>
						Cancel Changes
					</Button>
				</ButtonGroup>
			</form>
		);
	} else if (formType === 'login') {
		return (
			<form className={classes.Form} onSubmit={onSubmit}>
				{renderInputField(formType, user, userLoginForm)}
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					type="submit"
				>
					Войти
				</Button>
			</form>
		);
	} else {
		return (
			<form className={classes.Form} onSubmit={onSubmit}>
				{renderInputField(formType, user, userCreateForm)}
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					type="submit"
				>
					Add
				</Button>
			</form>
		);
	}
};

export default Form;
