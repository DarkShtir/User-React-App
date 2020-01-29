import React from 'react';
import { CreateForm } from '../CreateForm/CreateForm';
import { EditForm } from '../EditForm/EditForm';
import { UserList } from '../UserList/UserList';
import { User } from '../../interfaces';

const App: React.FC = () => {
	// const addHandler = (user: User) => {
	// 	const newUser: user = {
	// 		id: Date.now(),
	// 		login: user.login,
	// 		password: user.password,
	// 		name: user.name,
	// 		lastName: user.lastName,
	// 		nat: user.nat,
	// 		gender: user.gender,
	// 		phone: user.phone,
	// 	};

	// };
	return (
		<div>
			<CreateForm />
			{/* <CreateForm onAdd={addHandler} /> */}
			<UserList />
			<EditForm />
		</div>
	);
};

export default App;
