import React, { Component } from 'react';
import { CreateForm } from '../../components/CreateForm/CreateForm';
import UserService from '../../services/user-service';
import { User } from '../../interfaces';

interface State {
	needAdd: boolean;
}

export class RegistrationPage extends Component<{}, State> {
	state = {
		needAdd: false,
	};
	addUser = (user: User): void => {
		UserService.addUser(user);
	};
	//TODO Added route on userpage after registration
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
