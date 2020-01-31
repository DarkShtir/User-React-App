import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { User } from '../../interfaces';
// import classes from './EditForm.module.scss';

interface Props {
	onUserUpdated(user: object, id: number): void;
	userToggle(id: number): void;
	editUser: object;
}

interface State {
	user: User;
}
export class EditForm extends Component<Props, State> {
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
		this.props.onUserUpdated(this.state.user, this.state.user.id);
		console.log('New user ', this.state.user);
		// this.setState({
		// 	user: {
		// 		id: 0,
		// 		login: '',
		// 		password: '',
		// 		name: '',
		// 		lastName: '',
		// 		nat: '',
		// 		gender: '',
		// 		phone: '',
		// 	},
		// });
		this.props.userToggle(this.state.user.id);
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		const newUser: User = { ...this.state.user, [fieldName]: value };
		console.log(newUser);
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

	renderInputField(): object {
		const cls = ['active'];
		return Object.keys(this.state.user).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				if (
					fieldName !== 'id' &&
					fieldName !== 'login' &&
					fieldName !== 'password'
				) {
					return (
						<React.Fragment key={fieldName + index}>
							<Input
								className={cls}
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
				<h2>Edit User</h2>
				<form className="col s12 " onSubmit={this.submitHandler}>
					{this.renderInputField()}
					<button className="btn btn-large waves-effect waves-light deep-purple darken-2 center">
						Save Changes
					</button>
				</form>
				<button className="btn waves-effect waves-light red center">
					Cancel Changes
				</button>
			</div>
		);
	}
}
