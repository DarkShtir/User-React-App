import React, { Component } from 'react';
import { CreateForm } from '../CreateForm/CreateForm';
import { EditForm } from '../EditForm/EditForm';
import { UserList } from '../UserList/UserList';
import { User } from '../../interfaces';
import UserService from '../../services/user-service';
import { Container } from '@material-ui/core';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import UsersPage from '../../pages/UsersPage/UsersPage';
import MainPage from '../../pages/MainPage/MainPage';
interface State {
	newUsers: User[] | [];
	needAdd: boolean;
	needEdit: boolean;
	idEditUser: string;
}
export class App extends Component<{}, State> {
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
		idEditUser: '0',
	};

	addUser = (user: object): void => {
		UserService.addUser(user);
		// this.setState(({ newUsers }): object => {
		// 	const newUser = [...newUsers, user];
		// 	return { newUsers: newUser };
		// });
		console.log(this.state.newUsers);
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

	async getAllUsers(): Promise<void> {
		const res = await UserService.getAllUsers();
		console.log(res);
	}

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
			return { newUsers: newUser };
		});
	};

	deleteHandler = async (id: string): Promise<void> => {
		await UserService.deleteUser(id);
		this.setState(({ newUsers }): object => {
			const newArr = newUsers.filter(user => user._id !== id);

			return { newUsers: newArr };
		});
	};

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

	editUser = (): object | undefined => {
		return this.state.newUsers.find(user => user._id === this.state.idEditUser);
	};

	render(): JSX.Element {
		return (
			<Container>
				<LoginPage />
				<RegistrationPage />
				<UsersPage />
				<MainPage />
				{this.state.needAdd ? (
					<CreateForm
						onUserAdded={this.addUser}
						userAddToggle={this.addUserToggle}
					/>
				) : (
					<></>
				)}
				<UserList
					users={this.state.newUsers}
					userAddToggle={this.addUserToggle}
					userEditToggle={this.editUserToggle}
					userRemove={this.deleteHandler}
					getUsersFromDB={this.getAllUsers}
				/>
				{this.state.needEdit ? (
					<EditForm
						userToggle={this.editUserToggle}
						editUser={this.editUser()}
						onUserUpdated={this.updateUser}
					/>
				) : (
					<></>
				)}
			</Container>
		);
	}
}

export default App;
