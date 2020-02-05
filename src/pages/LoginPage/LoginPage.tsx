import React, { Component } from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Paper } from '@material-ui/core';

interface State {
	login: boolean;
}

export default class LoginPage extends Component<{}, State> {
	state = {
		login: false,
	};
	loginUser = (loginData: UserLogin): void => {
		UserService.login(loginData);
		this.setState(({ login }) => {
			login = !login;
		});
	};
	//TODO Added route on user page after login
	render(): JSX.Element {
		return (
			<Paper>
				<LoginForm onUserLogin={this.loginUser} />
			</Paper>
		);
	}
}
