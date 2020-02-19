import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { EditUserForm } from '../../components/EditUserForm/EditUserForm';
import { Paper } from '@material-ui/core';
import { isLoginContext } from '../../components/utils/state';
import userService from '../../services/user-service';

export const EditPage: React.FC = () => {
	const { activeUser, setUser } = useContext<any>(isLoginContext);
	const history = useHistory();

	const updateUser = (id: string, user: {}): void => {
		const newUser = userService.updateUser(id, user);
		setUser(newUser);

		console.log(activeUser);
		history.push(`/user/${id}`);
	};

	return (
		<Paper>
			<EditUserForm editUser={activeUser} onUserUpdated={updateUser} />
		</Paper>
	);
};
