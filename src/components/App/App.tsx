import React, { Component } from 'react';
import { CreateForm } from '../CreateForm/CreateForm';
import { EditForm } from '../EditForm/EditForm';
import { UserList } from '../UserList/UserList';
import { User } from '../../interfaces';
interface State {
	newUsers: User[] | [];
	needAdd: boolean;
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
	};
	addUser = (user: object): void => {
		this.setState(({ newUsers }): object => {
			const newUser = [...newUsers, user];
			// console.log(newUser);
			return { newUsers: newUser };
		});
		// console.log('Added', user);
	};

	deleteHandler = (id: number): void => {
		this.setState(({ newUsers }): object => {
			// const idx = users.findIndex(el => el.id === id);

			const newArr = newUsers.filter(user => user.id !== id);
			return { users: newArr };
		});
	};

	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};

	render(): JSX.Element {
		return (
			<div>
				{this.state.needAdd ? <CreateForm onUserAdded={this.addUser} /> : <></>}

				<UserList users={this.state.newUsers} userToggle={this.addUserToggle} />
				<EditForm />
			</div>
		);
	}
}

export default App;
