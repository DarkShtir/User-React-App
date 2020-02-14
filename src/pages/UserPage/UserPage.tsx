import React, {
	useContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from 'react';

import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import Loading from '../../components/shared/Loading/Loading';
import { isLoginContext } from '../../components/utils/state';

import userService from '../../services/user-service';

import classes from './UserPage.module.scss';

//!!! ИСПРАВИТЬ ПОВЕДЕНИЕ СТРАНИЦЫ И ОТОБРАЖЕНИЕ ПЭТОВ!!!!!
const UserPage = (props: any): JSX.Element => {
	const { id, activeUser, setUser } = useContext<any>(isLoginContext);
	const [loading, setLoading] = useState(true);
	const [guestId, setGuestId] = useState('');
	const [guest, setGuest] = useState(false);

	useMemo(() => {
		setGuestId(props.match.url.slice(6));
		if (guestId !== id) {
			setGuest(true);
		} else {
			setGuest(false);
		}
	}, [props.match.url, setGuest, id, guestId]);

	const userWithCallback = useCallback(
		async id => {
			console.log(id);
			const newUser = await userService.getUserById(id);
			if (newUser !== undefined && newUser !== null) {
				setUser(newUser);
				setLoading(false);
			}
		},
		[setUser]
	);

	useEffect(() => {
		if (id && id !== undefined && id !== null && id !== '' && id === guestId) {
			userWithCallback(id);
		} else if (id !== guestId) {
			userWithCallback(guestId);
			console.log('You are guest USer');
		}

		return (): void => {
			console.log('cleared');
		};
	}, [userWithCallback, id, guestId]);

	return (
		<div className={classes.UserPage}>
			{loading ? (
				<Loading />
			) : (
				<>
					<CardAvatar user={activeUser} guest={guest} />
					<CardUser user={activeUser} guest={guest} />
				</>
			)}
		</div>
	);
};

export default UserPage;
