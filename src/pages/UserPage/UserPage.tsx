import React, { useContext, useEffect, useState } from 'react';
import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import classes from './UserPage.module.scss';
import { isLoginContext } from '../../components/utils/state';
import userService from '../../services/user-service';
import Loading from '../../components/shared/Loading/Loading';

const UserPage = (): JSX.Element => {
	const { id, activeUser, setUser } = useContext<any>(isLoginContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getUser = async (getId: string): Promise<void> => {
			const newUser = await userService.getUserById(getId);
			if (newUser !== undefined && newUser !== null) {
				setUser(newUser);
				setLoading(false);
			}
		};
		if (id && id !== undefined && id !== null) {
			getUser(id);
		}
		return () => {
			console.log('cleared');
		};
	}, [id, setUser]);

	// const [user] = useState({
	// 	_id: 'derfonebfndf',
	// 	login: 'Matron-P',
	// 	password: '123456',
	// 	firstName: 'Matrona',
	// 	lastName: 'Chapaevna',
	// 	nat: 'BY',
	// 	gender: 'Female',
	// 	phone: '+375 29 1234567',
	// 	avatarUrl:
	// 		'https://i.pinimg.com/originals/5a/67/a0/5a67a00e18bb0f27c55b05cbb0791b54.jpg',
	// });

	return (
		<div className={classes.UserPage}>
			{loading ? (
				<Loading />
			) : (
				<>
					<CardAvatar user={activeUser} />
					<CardUser user={activeUser} />
				</>
			)}
		</div>
	);
};

export default UserPage;
