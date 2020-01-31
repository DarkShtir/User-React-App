import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { User } from '../../interfaces';
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
		const newUser: User = { ...this.state.user, [fieldName]: value };
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
					fieldName !== '_id' &&
					fieldName !== 'login' &&
					fieldName !== 'password' &&
					fieldName !== '__v' &&
					fieldName !== 'tokens'
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
				<button
					className="btn waves-effect waves-light red center"
					onClick={(): void => {
						this.props.userToggle(this.state.user._id);
					}}
				>
					Cancel Changes
				</button>
			</div>
		);
	}
}
