import React, { useState } from 'react';
import { Typography, Container } from '@material-ui/core';

import Form from '../shared/Form/Form';
import { UserLogin } from '../../interfaces';

import classes from './LoginForm.module.scss';

interface Props {
	onUserLogin: (user: UserLogin) => void;
}

const LoginForm: React.FC<Props> = ({ onUserLogin }) => {
	const [user, setUser] = useState({
		login: '',
		password: '',
	});

	const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onUserLogin(user);
		setUser({
			login: '',
			password: '',
		});
	};

	const handleInputChanges = (value: string, fieldName: string): void => {
		setUser(prevState => {
			return { ...prevState, [fieldName]: value };
		});
	};

	const userLoginFormTemplate = {
		login: 'Логин',
		password: 'Пароль',
	};

	return (
		<Container className={classes.LoginForm}>
			<Typography variant="h3" align="center">
				Login
			</Typography>
			<Form
				targetObject={user}
				inputHandler={handleInputChanges}
				onSubmit={submitHandler}
				formType="login"
				templateForm={userLoginFormTemplate}
			/>
		</Container>
	);
};

export default LoginForm;
