import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

import Form from '../shared/Form/Form';
import { User } from '../../interfaces';

import classes from './EditUserForm.module.scss';

interface Props {
	editUser: object | undefined;
	onUserUpdated(id: string, user: object): void;
}

interface State {
	user: User;
}
export class EditUserForm extends Component<Props, State> {
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
		this.props.onUserUpdated(this.state.user._id, this.state.user);
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

	userEditFormTemplate = {
		firstName: 'Имя',
		lastName: 'Фамилия',
		gender: 'Пол',
		nat: 'Национальность',
		phone: 'Телефон',
	};

	render(): JSX.Element {
		return (
			<Container className={classes.EditForm}>
				<Typography variant="h3" align="center">
					Edit User
				</Typography>

				<Form
					targetObject={this.state.user}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					formType={'edit'}
					templateForm={this.userEditFormTemplate}
				/>
			</Container>
		);
	}
}
