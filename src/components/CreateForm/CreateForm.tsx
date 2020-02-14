import React, { Component } from 'react';
import classes from './CreateForm.module.scss';
import { User } from '../../interfaces';
import Form from '../shared/Form/Form';
import { Typography, Container } from '@material-ui/core';

interface Props {
	onUserAdded(user: object): void;
	userAddToggle(): void;
}
interface State {
	user: User;
}

export class CreateForm extends Component<Props, State> {
	state = {
		user: {
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
		this.props.onUserAdded(this.state.user);
		this.setState({
			user: {
				login: '',
				password: '',
				firstName: '',
				lastName: '',
				nat: '',
				gender: '',
				phone: '',
			},
		});
		this.props.userAddToggle();
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

	render(): JSX.Element {
		return (
			<Container className={classes.CreateForm}>
				<Typography variant="h3" align="center">
					Create User
				</Typography>
				<Form
					user={this.state.user}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
				/>
			</Container>
		);
	}
}
