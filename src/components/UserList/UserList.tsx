import React from 'react';
import classes from './UserList.module.scss';
import UserListItem from './UserListItem/UserListItem';
import { User } from '../../interfaces';

interface State {
	users: User[];
}

interface Props {
	users: User[];
	userToggle(): void;
}

const myNewClass = classes.mt1 + ' waves-effect waves-teal btn yellow darken-4';

export class UserList extends React.Component<Props, State> {
	state = {
		users: [
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
			{
				id: 2,
				login: 'Mar',
				password: '123456',
				name: 'Maria',
				lastName: 'Petrova',
				nat: 'RU',
				gender: 'Female',
				phone: '+375 29 2234567',
			},
		],
	};

	deleteHandler = (id: number): void => {
		this.setState(({ users }) => {
			// const idx = users.findIndex(el => el.id === id);

			const newArr = users.filter(user => user.id !== id);
			return { users: newArr };
		});
	};

	render(): JSX.Element {
		return (
			<div className="container center-align">
				<h2>User List</h2>
				<table className="highlight centered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Last Name</th>
							<th>Nationality</th>
							<th>Gender</th>
							<th>Phone</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.map((user, index) => (
							<UserListItem
								onRemove={(): void => {
									this.deleteHandler(user.id);
								}}
								user={user}
								key={index}
							/>
						))}
					</tbody>
				</table>
				<button className={myNewClass} onClick={this.props.userToggle}>
					Add User
				</button>
			</div>
		);
	}
}
