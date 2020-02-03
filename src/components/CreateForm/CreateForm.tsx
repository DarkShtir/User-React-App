import React, { Component } from 'react';
import './CreateForm.module.scss';
import Input from '../UI/Input/Input';
import { User } from '../../interfaces';

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
		this.props.onUserAdded(this.state.user);
		this.setState({
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
		});
		this.props.userAddToggle();
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		// console.log(fieldName, value);
		// const newId = Date.now();
		const newUser: User = {
			...this.state.user,
			[fieldName]: value,
		};
		// console.log(newUser);
		this.setState(() => {
			return {
				user: newUser,
			};
		});
	};

	renderInputField(): object {
		return Object.keys(this.state.user).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				if (fieldName !== '_id') {
					return (
						<React.Fragment key={fieldName + index}>
							<Input
								value={this.state.user}
								label={fieldName}
								type={
									fieldName === 'password'
										? fieldName
										: fieldName === 'phone'
										? 'tel'
										: ''
								}
								onChange={(event): void => {
									this.handleInputChanges(event.target.value, fieldName);
								}}
							/>
						</React.Fragment>
					);
				}
			}
		);
	}

	render(): JSX.Element {
		return (
			<div className="row center-align container">
				<h2>Create User</h2>
				<form className="col s12 " onSubmit={this.submitHandler}>
					{this.renderInputField()}

					<button className="btn-floating btn-large waves-effect waves-light yellow darken-4 center">
						Add
					</button>
				</form>
			</div>
		);
	}
}
