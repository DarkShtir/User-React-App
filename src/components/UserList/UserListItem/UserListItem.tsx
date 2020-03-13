import React from 'react';
import { User } from '../../../interfaces';
import { Button, TableRow, TableCell, ButtonGroup } from '@material-ui/core';

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

	return (
		<>
			<TableRow>
				<TableCell align="center">{user.firstName}</TableCell>
				<TableCell align="center">{user.lastName}</TableCell>
				<TableCell align="center">{user.nat}</TableCell>
				<TableCell align="center">{user.gender}</TableCell>
				<TableCell align="center">{user.phone}</TableCell>
				<TableCell align="center">
					<ButtonGroup>
						{/* <Button
							color="primary"
							onClick={(event): void => {
								editHandler(event, user._id);
							}}
						>
							Edit
						</Button> */}
						<Button
							color="secondary"
							onClick={(event): void => {
								removeHandler(event, user._id);
							}}
						>
							Delete
						</Button>
					</ButtonGroup>
				</TableCell>
			</TableRow>
		</>
	);
};

export default UserListItem;
