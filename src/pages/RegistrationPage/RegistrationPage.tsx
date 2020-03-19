import React, { useEffect } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import { addUserAction } from '../../store/users/users.actions';
import { RootState } from '../../store/interfaces/RootState';
import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import { User } from '../../interfaces';

import classes from './RegistrationPage.module.scss';

interface Props {
	login: boolean;
	id: string;
	addUserAction: (user: User) => void;
}

const RegistrationPage: React.FC<Props> = ({ login, id, addUserAction }) => {
	const history = useHistory();

	useEffect(() => {
		if (login && id !== '') {
			history.push(`user/${id}`);
		}
	}, [login, history, id]);

	return (
		<Paper className={classes.RegistrationPage}>
			<CreateUserForm onUserAdded={addUserAction} />
		</Paper>
	);
};

const mapStateToProps = (state: RootState) => ({
	login: state.appState.login,
	id: state.users.id,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	addUserAction: (user: User) => dispatch(addUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
