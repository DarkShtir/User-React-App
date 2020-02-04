import React, { Component } from 'react';
import { Typography, Container } from '@material-ui/core';
import Form from '../shared/Form/Form';
import { UserLogin } from '../../interfaces';

interface State {
	user: UserLogin;
}

interface Props {
	onUserLogin(user: UserLogin): void;
}

export default class LoginForm extends Component<Props, State> {
	state = {
		user: { login: '', password: '' },
	};

	submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		this.props.onUserLogin(this.state.user);
		this.setState({
			user: { login: '', password: '' },
		});
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		const user: UserLogin = {
			...this.state.user,
			[fieldName]: value,
		};
		this.setState(() => {
			return {
				user: user,
			};
		});
	};

	render(): JSX.Element {
		return (
			<Container>
				<Typography variant="h3">LogIn</Typography>
				<Form
					user={this.state.user}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					formType="login"
				/>
			</Container>
		);
	}
}
