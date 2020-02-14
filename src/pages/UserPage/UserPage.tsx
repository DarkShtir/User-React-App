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
import CardPets from '../../components/CardPets/CardPets';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';

interface Pets {
	_id: string;
	name: string;
	species: string;
	ownerId?: string | any;
	__v: number;
}

//!!! ИСПРАВИТЬ ПОВЕДЕНИЕ СТРАНИЦЫ И ОТОБРАЖЕНИЕ ПЭТОВ!!!!!
const UserPage = (props: any): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const { id, activeUser, setUser } = useContext<any>(isLoginContext);
	const [loading, setLoading] = useState(loadingEnum.Loading);
	const [guestId, setGuestId] = useState('');
	const [guest, setGuest] = useState(false);
	const [pets, setPets] = useState();

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
			const newUser = await userService.getUserById(id);
			const newPets = await userService.getUserPets(id);
			if (newUser !== undefined && newUser !== null) {
				setUser(newUser);
				setPets(newPets);
				setLoading(loadingEnum.Loaded);
			} else {
				setLoading(loadingEnum.Error);
			}
		},
		[setUser, setPets, loadingEnum.Loaded, loadingEnum.Error]
	);

	useEffect(() => {
		if (id && id !== undefined && id !== null && id !== '' && id === guestId) {
			userWithCallback(id);
		} else if (id !== guestId && id) {
			userWithCallback(guestId);
			console.log('You are guest User');
		}

		return (): void => {
			console.log('cleared');
		};
	}, [userWithCallback, id, guestId]);

	switch (loading) {
		case loadingEnum.Error:
			return <ErrorIndicator />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return (
				<div className={classes.UserPage}>
					<>
						<CardAvatar user={activeUser} guest={guest} />
						<div className={classes.infoWrapper}>
							<CardUser user={activeUser} guest={guest} />
							{pets ? (
								<div className={classes.pets}>
									{pets.map((pet: any, index: number) => {
										return <CardPets pet={pet} key={index} guest={guest} />;
									})}
								</div>
							) : null}
						</div>
					</>
				</div>
			);
	}
};

export default UserPage;
