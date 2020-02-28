import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CardAvatar from '../../components/CardAvatar/CardAvatar';
import Loading from '../../components/shared/Loading/Loading';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import { isLoginContext } from '../../components/utils/state';
import CreatePet from '../../components/CreatePet/CreatePet';
import EditPet from '../../components/EditPet/EditPet';
import InfoUser from '../../components/InfoUser/InfoUser';

import { userService, petService, albumService } from '../../services/services';
import { Pet } from '../../interfaces';

import classes from './UserPage.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Dispatch, Action } from 'redux';
import {
	setGuestIdAction,
	setGuestAction,
} from '../../store/users/users.actions';

interface Props {
	login: boolean;
	id: string;
	guestId: string;
	setGuestId: (guestId: string) => void;
	guest: boolean;
	setGuest: (guest: boolean) => void;
}

const UserPage: React.FC<Props & RouteComponentProps> = ({
	login,
	id,
	guestId,
	setGuestId,
	guest,
	setGuest,
	...props
}): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const { activeUser, setUser } = useContext<any>(isLoginContext);

	//TODO Перенести всё это в СТОР
	const [loading, setLoading] = useState(loadingEnum.Loading);
	// const [guestId, setGuestId] = useState('');
	// const [guest, setGuest] = useState(false);
	const [pets, setPets] = React.useState<any>();
	const [editPet, setEditPet] = React.useState<any>();
	const [needAdd, setNeedAdd] = useState(false);
	const [albums, setAlbums] = React.useState<any>([]);

	const setUserQuotes = async (quotes: string): Promise<void> => {
		try {
			if (quotes) {
				await userService.updateUser(id, { quotes: quotes });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const setUserAvatar = async (avatar: object): Promise<void> => {
		try {
			if (avatar) {
				console.log(avatar);
				await userService.setAvatar(id, avatar);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkGuest = useCallback(async () => {
		try {
			setGuestId(props.match.url.slice(6));
			if (guestId !== id) {
				setGuest(true);
			} else {
				setGuest(false);
			}
		} catch (error) {
			console.log(error);
		}
	}, [guestId, props.match.url, setGuest, setGuestId, id]);

	useEffect(() => {
		checkGuest();
	});
	// useMemo(() => {
	// 	setGuestId(props.match.url.slice(6));
	// 	if (guestId !== id) {
	// 		setGuest(true);
	// 	} else {
	// 		setGuest(false);
	// 	}
	// }, [props.match.url, setGuest, id, guestId, setGuestId]);

	const userWithCallback = useCallback(
		async id => {
			try {
				if (id) {
					const newUser = await userService.getUserById(id);
					const newPets = await userService.getUserPets(id);
					const newAlbums = await albumService.getAllAlbumByUserId(id);
					if (newUser !== undefined && newUser !== null && newUser) {
						setUser(newUser);
						setPets(newPets);
						setAlbums(newAlbums);
						setLoading(loadingEnum.Loaded);
					} else {
						setLoading(loadingEnum.Error);
						throw new Error('Пользователя не найдено!');
					}
				}
			} catch (error) {
				console.log(error);
				setLoading(loadingEnum.Error);
			}
		},
		[setUser, setPets, loadingEnum.Loaded, loadingEnum.Error]
	);

	useEffect(() => {
		if (id && id === guestId) {
			userWithCallback(id);
		} else if (id !== guestId /*&& id*/) {
			userWithCallback(guestId);
		}
	}, [userWithCallback, id, guestId]);

	const handlerDeletePet = async (petId: string): Promise<void> => {
		await petService.deletePet(petId);
		const newPets = await userService.getUserPets(id);
		setPets(newPets);
		setEditPet(null);
	};

	const updatePet = useCallback(
		async (petId: string, pet: Pet): Promise<void> => {
			try {
				await petService.updatePet(petId, pet);
				const newPets = await userService.getUserPets(id);
				setPets(newPets);
				setEditPet(null);
			} catch (error) {
				console.log(error);
			}
		},
		[id]
	);

	const handlerEditPet = (pet: Pet): void => {
		setEditPet(pet);
	};

	const hadlerAddPet = (): void => {
		setNeedAdd((prevState: boolean): any => !prevState);
	};

	const addPet = async (pet: Pet): Promise<void> => {
		const newPet = { ...pet, ...{ ownerId: id } };
		await petService.addPet(newPet);
		const newPets = await userService.getUserPets(id);
		setPets(newPets);
	};

	switch (loading) {
		case loadingEnum.Error:
			return <ErrorIndicator error={null} />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return (
				<div className={classes.UserPage}>
					<>
						<CardAvatar
							user={activeUser}
							guest={guest}
							setUserAvatar={setUserAvatar}
							setUserQuotes={setUserQuotes}
						/>

						<InfoUser
							activeUser={activeUser}
							guest={guest}
							pets={pets}
							login={login}
							handlerEditPet={handlerEditPet}
							setNeedAdd={setNeedAdd}
							albums={albums}
						/>
					</>
					{editPet ? (
						<EditPet
							setEditPet={setEditPet}
							editPet={editPet}
							updatePet={updatePet}
							handlerDeletePet={handlerDeletePet}
						/>
					) : null}
					{needAdd ? (
						<CreatePet
							setNeedAdd={setNeedAdd}
							addPet={addPet}
							hadlerAddPet={hadlerAddPet}
						/>
					) : null}
				</div>
			);
	}
};

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
	guestId: state.users.guestId,
	guest: state.users.guest,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setGuestId: (guestId: string) => dispatch(setGuestIdAction(guestId)),
	setGuest: (guest: boolean) => dispatch(setGuestAction(guest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
