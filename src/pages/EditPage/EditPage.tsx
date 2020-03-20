import React from 'react';
import { useHistory } from 'react-router-dom';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { EditUserForm } from '../../components/EditUserForm/EditUserForm';
import { RootState } from '../../store/interfaces/RootState';
import { updateUserAction } from '../../store/users/users.actions';
import { User } from '../../interfaces';

interface Props {
	user: User | null;
	updateUser: (id: string, newUser: {}) => void;
}

const EditPage: React.FC<Props> = ({ user, updateUser }) => {
	const history = useHistory();

	const updateUserHandler = (id: string, user: {}): void => {
		updateUser(id, user);
		history.push(`/user/${id}`);
	};

	return (
		<Paper>
			<EditUserForm editUser={user || {}} onUserUpdated={updateUserHandler} />
		</Paper>
	);
};

const mapStateToProps = (state: RootState) => ({
	user: state.users.activeUser,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	updateUser: (id: string, newUser: {}) =>
		dispatch(updateUserAction(id, newUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
