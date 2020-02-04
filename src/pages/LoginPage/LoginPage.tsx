import React, { Component } from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import LoginForm from '../../components/LoginForm/LoginForm';

interface State {
	login: boolean;
}

export class LoginPage extends Component<{}, State> {
	state = {
		login: false,
	};
	loginUser = (loginData: UserLogin): void => {
		UserService.login(loginData);
		this.setState(({ login }) => {
			login = !login;
		});
	};
	//Проверка привязки SSH
	render(): JSX.Element {
		return (
			<div>
				<LoginForm onUserLogin={this.loginUser} />
			</div>
		);
	}
}
