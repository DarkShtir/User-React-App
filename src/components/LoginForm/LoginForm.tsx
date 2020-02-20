import React, { useState, useContext } from 'react';
import { Typography, Container } from '@material-ui/core';
import Form from '../shared/Form/Form';
import { UserLogin } from '../../interfaces';
import { isLoginContext } from '../utils/state';

import classes from './LoginForm.module.scss';

interface Props {
	onUserLogin(user: UserLogin): void;
}

export const LoginForm: React.FC<Props> = props => {
	const { setLogin } = useContext<any>(isLoginContext);

	const [user, setUser] = useState({
		login: '',
		password: '',
	});

	const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		props.onUserLogin(user);
		console.log(user);
		setUser({
			login: '',
			password: '',
		});
		setLogin(true);
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
