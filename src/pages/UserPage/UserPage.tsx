import React, { useState } from 'react';
import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import classes from './UserPage.module.scss';

const UserPage = (): JSX.Element => {
	const [user] = useState({
		_id: 'derfonebfndf',
		login: 'Matron-P',
		password: '123456',
		firstName: 'Matrona',
		lastName: 'Chapaevna',
		nat: 'BY',
		gender: 'Female',
		phone: '+375 29 1234567',
		avatarUrl:
			'https://i.pinimg.com/originals/5a/67/a0/5a67a00e18bb0f27c55b05cbb0791b54.jpg',
	});
	return (
		<div className={classes.UserPage}>
			<CardAvatar user={user} />
			<CardUser user={user} />
		</div>
	);
};

export default UserPage;
