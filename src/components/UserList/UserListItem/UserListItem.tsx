import React from 'react';
import { User } from '../../../interfaces';

interface Props {
	user: User;
	onRemove: (id: number) => void;
}

const UserListItem: React.FC<Props> = ({ user, onRemove }) => {
	const removeHandler = (event: React.MouseEvent, id: number): void => {
		event.preventDefault();
		onRemove(id);
	};

	return (
		<>
			<tr>
				<td>{user.name}</td>
				<td>{user.lastName}</td>
				<td>{user.nat}</td>
				<td>{user.gender}</td>
				<td>{user.phone}</td>
				<td>
					<button className="waves-effect waves-light btn deep-purple darken-2">
						Edit
					</button>
					<button
						onClick={(event): any => {
							removeHandler(event, user.id);
						}}
						className="waves-effect waves-teal btn red"
					>
						Delete
					</button>
				</td>
			</tr>
		</>
	);
};

export default UserListItem;
