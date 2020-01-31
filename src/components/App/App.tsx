import React, { Component } from 'react';
import { CreateForm } from '../CreateForm/CreateForm';
import { EditForm } from '../EditForm/EditForm';
import { UserList } from '../UserList/UserList';
import { User } from '../../interfaces';
interface State {
	newUsers: User[] | [];
	needAdd: boolean;
	needEdit: boolean;
	idEditUser: number;
}
export class App extends Component<{}, State> {
	state = {
		newUsers: [
			{
				id: 1,
				login: 'Vas',
				password: '123456',
				name: 'Vasya',
				lastName: 'Petrov',
				nat: 'RU',
				gender: 'Male',
				phone: '+375 29 1234567',
			},
		],
		needAdd: false,
		needEdit: false,
		idEditUser: 0,
	};
	addUser = (user: object): void => {
		this.setState(({ newUsers }): object => {
			const newUser = [...newUsers, user];
			return { newUsers: newUser };
		});
	};

	updateUser = (user: object, id: number): void => {
		this.setState(({ newUsers }): object => {
			const newUser = [...newUsers];
			// eslint-disable-next-line
			newUser.find(oldUser => {
				if (oldUser.id === id) {
					Object.assign(oldUser, user);
					return true;
				}
			});
			return { newUsers: newUser };
		});
	};

	deleteHandler = (id: number): void => {
		console.log(id);
		this.setState(({ newUsers }): object => {
			// const idx = users.findIndex(el => el.id === id);

			const newArr = newUsers.filter(user => user.id !== id);
			return { newUsers: newArr };
		});
	};

	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};

	editUserToggle = (id: number): void => {
		this.setState(({ needEdit }) => {
			return { needEdit: !needEdit, idEditUser: id };
		});
	};

	editUser = (): any => {
		return this.state.newUsers.find(user => {
			if (user.id === this.state.idEditUser) {
				return true;
			} else {
				return false;
			}
		});
	};

	render(): JSX.Element {
		return (
			<div>
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
			</div>
		);
	}
}

export default App;
