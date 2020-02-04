import React, { Component } from 'react';
import { User } from '../../interfaces';
import Form from '../Form/Form';
import { Container, Button, Typography } from '@material-ui/core';
// import classes from './EditForm.module.scss';

interface Props {
	onUserUpdated(user: object, id: string): void;
	userToggle(id: string): void;
	editUser: object | undefined;
}

interface State {
	user: User;
}
export class EditForm extends Component<Props, State> {
	state = {
		user: {
			_id: '0',
			login: '',
			password: '',
			firstName: '',
			lastName: '',
			nat: '',
			gender: '',
			phone: '',
		},
	};

	submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		this.props.onUserUpdated(this.state.user, this.state.user._id);
		this.props.userToggle(this.state.user._id);
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		const newUser: User = {
			...this.state.user,
			[fieldName]: value,
		};
		this.setState(() => {
			return {
				user: newUser,
			};
		});
	};

	componentDidMount(): void {
		this.updateState();
	}
	updateState = (): void => {
		this.setState((): object => {
			return { user: this.props.editUser };
		});
	};

	render(): JSX.Element {
		return (
			<Container>
				<Typography variant="h3">Edit User</Typography>

				<Form
					user={this.state.user}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					formType={'edit'}
				/>

				<Button
					color="secondary"
					onClick={(): void => {
						this.props.userToggle(this.state.user._id);
					}}
				>
					Cancel Changes
				</Button>
			</Container>
		);
	}
}
