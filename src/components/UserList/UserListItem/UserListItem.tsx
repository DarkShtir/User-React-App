import React from 'react';
import { User } from '../../../interfaces';

interface Props {
	user: User;
	onRemove: (id: string | undefined) => void;
	onEdit: (id: string | undefined) => void;
}

const UserListItem: React.FC<Props> = ({ user, onRemove, onEdit }) => {
	const removeHandler = (
		event: React.MouseEvent,
		id: string | undefined
	): void => {
		event.preventDefault();
		onRemove(id);
	};

	const editHandler = (
		event: React.MouseEvent,
		id: string | undefined
	): void => {
		event.preventDefault();
		console.log(user._id);
		onEdit(id);
	};

	return (
		<>
			<tr>
				<td>{user.firstName}</td>
				<td>{user.lastName}</td>
				<td>{user.nat}</td>
				<td>{user.gender}</td>
				<td>{user.phone}</td>
				<td>
					<button
						className="waves-effect waves-light btn deep-purple darken-2"
						onClick={(event): void => {
							editHandler(event, user._id);
						}}
					>
						Edit
					</button>
					<button
						onClick={(event): void => {
							removeHandler(event, user._id);
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
