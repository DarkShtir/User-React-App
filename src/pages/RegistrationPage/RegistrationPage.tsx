import React, { Component } from 'react';
import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import UserService from '../../services/user-service';
import { User } from '../../interfaces';
import { Paper } from '@material-ui/core';
import { createBrowserHistory } from 'history';

interface State {
	needAdd: boolean;
}

const history = createBrowserHistory();
export default class RegistrationPage extends Component<{}, State> {
	state = {
		needAdd: false,
	};
	//!!! Спросить про редирект, возможно нужен set login true!!!!
	addUser = async (user: User): Promise<any> => {
		await UserService.addUser(user);
		// const id = await localStorage.getItem('id');
		if (localStorage.getItem('id')) {
			history.push(`./${localStorage.getItem('id')}`);
		}
	};

	//TODO Added route on userpage after registration
	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};
	render(): JSX.Element {
		return (
			<Paper>
				<CreateUserForm
					onUserAdded={this.addUser}
					userAddToggle={this.addUserToggle}
				/>
			</Paper>
		);
	}
}
