import React, { Component } from 'react';
import { CreateForm } from '../../components/CreateForm/CreateForm';
import UserService from '../../services/user-service';
import { User } from '../../interfaces';

interface State {
	users: User[] | [];
	needAdd: boolean;
}

export class RegistrationPage extends Component<{}, State> {
	state = {
		users: [
			{
				_id: '1',
				login: 'Vas',
				password: '123456',
				firstName: 'Vasya',
				lastName: 'Petrov',
				nat: 'RU',
				gender: 'Male',
				phone: '+375 29 1234567',
			},
		],
		needAdd: false,
	};
	addUser = (user: object): void => {
		UserService.addUser(user);
		console.log(this.state.users);
	};
	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};
	render(): JSX.Element {
		return (
			<div>
				<CreateForm
					onUserAdded={this.addUser}
					userAddToggle={this.addUserToggle}
				/>
			</div>
		);
	}
}
