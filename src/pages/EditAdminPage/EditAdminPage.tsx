import React, { Component } from 'react';
import { User } from '../../interfaces';
import { Paper } from '@material-ui/core';

interface State {
	newUsers: User[] | [];
	needAdd: boolean;
	needEdit: boolean;
	idEditUser: string;
}

export default class EditPage extends Component<{}, State> {
	state = {
		newUsers: [
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
		needEdit: false,
		idEditUser: '1',
	};

	editUserToggle = (id: string): void => {
		this.setState(({ needEdit }) => {
			return { needEdit: !needEdit, idEditUser: id };
		});
	};

	editUser = (): object | undefined => {
		return this.state.newUsers.find(user => user._id === this.state.idEditUser);
	};

	updateUser = (user: object, id: string): void => {
		this.setState(({ newUsers }): object => {
			const newUser = [...newUsers];
			// eslint-disable-next-line
			newUser.find(oldUser => {
				if (oldUser._id === id) {
					Object.assign(oldUser, user);
					return true;
				}
			});
			console.log(newUser);
			return { newUsers: newUser };
		});
	};

	render(): JSX.Element {
		return (
			<Paper>
				{/* <EditForm
					userToggle={this.editUserToggle}
					editUser={this.editUser()}
					onUserUpdated={this.updateUser}
				/> */}
			</Paper>
		);
	}
}
