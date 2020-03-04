import React, { Component } from 'react';
import { UserList } from '../../components/UserList/UserList';
import { User } from '../../interfaces';
import UserService from '../../services/user-service';
import { Paper } from '@material-ui/core';

interface State {
	newUsers: User[] | [];
	needAdd: boolean;
	needEdit: boolean;
	idEditUser: string;
}

export default class UsersListPage extends Component<{}, State> {
	state = {
		newUsers: [],
		needAdd: false,
		needEdit: false,
		idEditUser: '0',
	};

	async componentDidMount(): Promise<void> {
		const res = await UserService.getAllUsers();
		if (res === undefined) {
			console.log('Сервер не отвечает');
		} else {
			this.setState(({ newUsers }): object => {
				const newArr = [...newUsers, ...res];
				return { newUsers: newArr };
			});
		}
	}

	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};

	editUserToggle = (id: string): void => {
		this.setState(({ needEdit }) => {
			return { needEdit: !needEdit, idEditUser: id };
		});
	};

	deleteHandler = async (id: string): Promise<void> => {
		await UserService.deleteUser(id);
		this.setState(({ newUsers }): object => {
			const newArr = newUsers.filter(user => user._id !== id);

			return { newUsers: newArr };
		});
	};

	async getAllUsers(): Promise<void> {
		const res = await UserService.getAllUsers();
		console.log(res);
	}

	render(): JSX.Element {
		return (
			<Paper>
				<UserList
					users={this.state.newUsers}
					userAddToggle={this.addUserToggle}
					userEditToggle={this.editUserToggle}
					userRemove={this.deleteHandler}
					getUsersFromDB={this.getAllUsers}
				/>
			</Paper>
		);
	}
}
