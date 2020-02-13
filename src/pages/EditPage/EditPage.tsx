import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { EditForm } from '../../components/EditForm/EditForm';
import { Paper } from '@material-ui/core';
import { isLoginContext } from '../../components/utils/state';
import userService from '../../services/user-service';

export const EditPage: React.FC = () => {
	console.log('Я сюда попал');
	const { activeUser, setUser } = useContext<any>(isLoginContext);
	const history = useHistory();

	// const editUserToggle = (id: string): void => {
	// 	this.setState(({ needEdit }) => {
	// 		return { needEdit: !needEdit, idEditUser: id };
	// 	});
	// };

	// const editUser = (): object | undefined => {
	// 	return this.state.newUsers.find(user => user._id === this.state.idEditUser);
	// };

	// const updateUser = (user: object, id: string): void => {
	// 	this.setState(({ newUsers }): object => {
	// 		const newUser = [...newUsers];
	// 		// eslint-disable-next-line
	// 		newUser.find(oldUser => {
	// 			if (oldUser._id === id) {
	// 				Object.assign(oldUser, user);
	// 				return true;
	// 			}
	// 		});
	// 		console.log(newUser);
	// 		return { newUsers: newUser };
	// 	});
	// };

	const updateUser = (id: string, user: {}): void => {
		const newUser = userService.updateUser(id, user);
		setUser(newUser);
		console.log(activeUser);
		history.push(`/user/${id}`);
	};

	return (
		<Paper>
			<EditForm
				// userToggle={this.editUserToggle}
				editUser={activeUser}
				onUserUpdated={updateUser}
			/>
		</Paper>
	);
};
