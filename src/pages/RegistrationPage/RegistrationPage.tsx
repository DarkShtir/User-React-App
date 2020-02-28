import React, { Component } from 'react';
import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import UserService from '../../services/user-service';
import { User } from '../../interfaces';
import { Paper } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import classes from './RegistrationPage.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Dispatch, Action } from 'redux';
import {
	setLoginAction,
	setUserIdAction,
} from '../../store/users/users.actions';

interface State {
	needAdd: boolean;
}

interface Props {
	login: boolean;
	id: string;
	setLogin: (isLogin: boolean) => void;
	setUserId: (id: string) => void;
}

const history = createBrowserHistory();
class RegistrationPage extends Component<Props, State> {
	state = {
		needAdd: false,
	};
	//!!! Спросить про редирект, возможно нужен set login true!!!!
	addUser = async (user: User): Promise<any> => {
		await UserService.addUser(user);
		const id = localStorage.getItem('id');
		if (id) {
			this.props.setLogin(true);
			this.props.setUserId(id);
		}
		if (localStorage.getItem('id')) {
			history.push(`user/${localStorage.getItem('id')}`);
		}
	};

	//TODO Added route on userpage after registration
	addUserToggle = (): void => {
		this.setState(({ needAdd }) => {
			return { needAdd: !needAdd };
		});
	};
	render(): JSX.Element {
		return (
			<Paper className={classes.RegistrationPage}>
				<CreateUserForm
					onUserAdded={this.addUser}
					userAddToggle={this.addUserToggle}
				/>
			</Paper>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setLogin: (isLogin: boolean) => dispatch(setLoginAction(isLogin)),
	setUserId: (id: string) => dispatch(setUserIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
