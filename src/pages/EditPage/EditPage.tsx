import React from 'react';
import { useHistory } from 'react-router-dom';
import { EditUserForm } from '../../components/EditUserForm/EditUserForm';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { User } from '../../interfaces';
import { Action, Dispatch } from 'redux';
import { updateUserAction } from '../../store/users/users.actions';

interface Props {
	user: User | null;
	updateUser: (id: string, newUser: {}) => void;
}

const EditPage: React.FC<Props> = ({ user, updateUser }) => {
	const history = useHistory();

	const updateUserHandler = (id: string, user: {}): void => {
		updateUser(id, user);
		console.log(user);
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
