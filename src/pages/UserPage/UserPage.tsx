import React, { useContext, useEffect, useState, useCallback } from 'react';
import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import classes from './UserPage.module.scss';
import { isLoginContext } from '../../components/utils/state';
import userService from '../../services/user-service';
import Loading from '../../components/shared/Loading/Loading';
// import CardPets from '../../components/CardPets/CardPets';
//!!! ИСПРАВИТЬ ПОВЕДЕНИЕ СТРАНИЦЫ И ОТОБРАЖЕНИЕ ПЭТОВ!!!!!
const UserPage = (): JSX.Element => {
	console.log('render');
	const { id, activeUser, setUser } = useContext<any>(isLoginContext);

	const [loading, setLoading] = useState(true);

	const userWithCallback = useCallback(
		async id => {
			const newUser = await userService.getUserById(id);
			if (newUser !== undefined && newUser !== null) {
				setUser(newUser);
				setLoading(false);
			}
		},
		[setUser]
	);

	useEffect(() => {
		if (id && id !== undefined && id !== null) {
			userWithCallback(id);
		}

		return (): void => {
			console.log('cleared');
		};
	}, [userWithCallback, id]);

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
