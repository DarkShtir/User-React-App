import React, { Component } from 'react';
import { Typography, Container } from '@material-ui/core';

import { User } from '../../interfaces';
import Form from '../shared/Form/Form';

import classes from './CreateUserForm.module.scss';

interface Props {
	onUserAdded(user: object): void;
}
interface State {
	user: User;
}

export class CreateUserForm extends Component<Props, State> {
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

	userCreateFormTemplate = {
		login: 'Логин',
		password: 'Пароль',
		firstName: 'Имя',
		lastName: 'Фамилия',
		gender: 'Пол',
		nat: 'Национальность',
		phone: 'Телефон',
	};

	render(): JSX.Element {
		return (
			<Container className={classes.CreateForm}>
				<Typography variant="h3" align="center">
					Create User
				</Typography>
				<Form
					targetObject={this.state.user}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					templateForm={this.userCreateFormTemplate}
				/>
			</Container>
		);
	}
}
