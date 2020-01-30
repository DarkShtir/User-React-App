import React, { Component } from 'react';
import './CreateForm.module.scss';
import Input from '../UI/Input/Input';
import { User } from '../../interfaces';

interface Props {
	onUserAdded(user: object): void;
}
interface State {
	user: User;
}

export class CreateForm extends Component<Props, State> {
	state = {
		user: {
			id: 0,
			login: '',
			password: '',
			name: '',
			lastName: '',
			nat: '',
			gender: '',
			phone: '',
		},
	};

	submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		// const newId = Date.now();
		// const userWithId: User = { ...this.state.user, id: newId };
		// this.setState(() => {
		// 	return { user: userWithId };
		// });
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		console.log(fieldName, value);
		const newId = Date.now();
		const newUser: User = { ...this.state.user, [fieldName]: value, id: newId };
		console.log(newUser);
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
				if (fieldName !== 'id') {
					return (
						<React.Fragment key={fieldName + index}>
							<Input
								value={''}
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

					<button
						onClick={(): void => this.props.onUserAdded(this.state.user)}
						className="btn-floating btn-large waves-effect waves-light yellow darken-4 center"
					>
						Add
					</button>
				</form>
			</div>
		);
	}
}
