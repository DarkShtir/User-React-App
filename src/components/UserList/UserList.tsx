import React from 'react';
import classes from './UserList.module.scss';
import UserListItem from './UserListItem/UserListItem';
import { User } from '../../interfaces';
import Button from '@material-ui/core/Button';
import {
	Grid,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
} from '@material-ui/core';

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

// const myNewClass = classes.mt1 + ' waves-effect waves-teal btn yellow darken-4';
// const cls = classes.button;
const cls = classes;
console.log(cls.button);

export class UserList extends React.Component<Props, State> {
	userEdit = (id: string | undefined): void => {
		this.props.userEditToggle(id);
		// this.props.userEdit(id);
	};
	render(): JSX.Element {
		return (
			<Grid container direction="column" justify="center" alignItems="center">
				<Typography variant="h3">User List</Typography>
				<Table className="highlight centered">
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Last Name</TableCell>
							<TableCell align="center">Nationality</TableCell>
							<TableCell align="center">Gender</TableCell>
							<TableCell align="center">Phone</TableCell>
							<TableCell align="center">Options</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
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
					</TableBody>
				</Table>
				<div className={classes.button}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.button}
						onClick={this.props.userAddToggle}
					>
						Add User
					</Button>
				</div>
				<Button
					variant="contained"
					className={classes.button}
					onClick={this.props.getUsersFromDB}
				>
					GET User
				</Button>
			</Grid>
		);
	}
}
