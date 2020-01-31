import React from 'react';
import classes from './UserList.module.scss';
import UserListItem from './UserListItem/UserListItem';
import { User } from '../../interfaces';

interface State {
	users: User[];
}

interface Props {
	users: User[];
	userAddToggle(): void;
	userEditToggle(id: string | undefined): void;
	userRemove(id: string | undefined): void;
	getUsersFromDB(): void;
	// userEdit(id: number): void;
}

const myNewClass = classes.mt1 + ' waves-effect waves-teal btn yellow darken-4';

export class UserList extends React.Component<Props, State> {
	userEdit = (id: string | undefined): void => {
		this.props.userEditToggle(id);
		// this.props.userEdit(id);
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
								onEdit={(): void => {
									this.userEdit(user._id);
								}}
								onRemove={(): void => {
									this.props.userRemove(user._id);
								}}
								user={user}
								key={index}
							/>
						))}
					</tbody>
				</table>
				<button className={myNewClass} onClick={this.props.userAddToggle}>
					Add User
				</button>
				<button className={myNewClass} onClick={this.props.getUsersFromDB}>
					GET User
				</button>
			</div>
		);
	}
}
