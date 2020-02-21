import React, {
	useContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import CardPets from '../../components/CardPets/CardPets';
import Loading from '../../components/shared/Loading/Loading';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import { isLoginContext } from '../../components/utils/state';
import { userService, petService } from '../../services/services';
import { Pet } from '../../interfaces';
import { EditPetForm } from '../../components/EditPetForm/EditPetForm';
import CancelIcon from '@material-ui/icons/Cancel';
import AddBoxIcon from '@material-ui/icons/AddBox';

import classes from './UserPage.module.scss';
import { CreatePetForm } from '../../components/CreatePetForm/CreatePetForm';
import { Typography } from '@material-ui/core';

//!!! ИСПРАВИТЬ ПОВЕДЕНИЕ СТРАНИЦЫ При получении PEts!!!!!
const UserPage = (props: RouteComponentProps): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const { id, activeUser, setUser, login } = useContext<any>(isLoginContext);

	const [loading, setLoading] = useState(loadingEnum.Loading);
	const [guestId, setGuestId] = useState('');
	const [guest, setGuest] = useState(false);
	const [pets, setPets] = useState();
	const [editPet, setEditPet] = useState();
	const [needAdd, setNeedAdd] = useState(false);

	const setUserQuotes = async (quotes: string): Promise<void> => {
		try {
			if (quotes) {
				await userService.updateUser(id, { quotes: quotes });
			}
		} catch (error) {
			console.log(error);
		}
	};

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
			try {
				const newUser = await userService.getUserById(id);
				const newPets = await userService.getUserPets(id);
				if (newUser !== undefined && newUser !== null && newUser) {
					setUser(newUser);
					setPets(newPets);
					setLoading(loadingEnum.Loaded);
				} else {
					setLoading(loadingEnum.Error);
					throw new Error('Пользователя не найдено!');
				}
			} catch (error) {
				console.log(error);
				setLoading(loadingEnum.Error);
			}
		},
		[setUser, setPets, loadingEnum.Loaded, loadingEnum.Error]
	);

	useEffect(() => {
		setLoading(loadingEnum.Loading);
	}, [activeUser, loadingEnum.Loading]);

	const setUserAvatar = async (avatar: object): Promise<void> => {
		try {
			if (avatar) {
				await userService.setAvatar(id, avatar);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id && id !== undefined && id !== null && id !== '' && id === guestId) {
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
						<div className={classes.infoWrapper}>
							<CardUser user={activeUser} guest={guest} />
							{(pets && pets.length > 0 && login) || !guest ? (
								<div className={classes.pets}>
									<Typography variant="h5" className={classes.typography}>
										My pets
									</Typography>
									{pets.map((pet: Pet, index: number) => {
										return (
											<CardPets
												pet={pet}
												key={index}
												guest={guest}
												editPet={handlerEditPet}
											/>
										);
									})}
									{!guest ? (
										<AddBoxIcon
											fontSize="large"
											className={classes.addIcon}
											onClick={(): void => {
												setNeedAdd(true);
											}}
										></AddBoxIcon>
									) : null}
								</div>
							) : null}
						</div>
					</>
					{editPet ? (
						<div
							className={classes.wrapperModalWindow}
							onClick={(
								e: React.MouseEvent<HTMLDivElement, MouseEvent>
							): void => {
								if (e.currentTarget === e.target) {
									setEditPet(null);
								}
							}}
						>
							<div className={classes.editPetForm}>
								<div
									className={classes.cancelIcon}
									onClick={(): void => {
										setEditPet(null);
									}}
								>
									<CancelIcon fontSize="large" />
								</div>
								<EditPetForm
									pet={editPet}
									onPetUpdated={updatePet}
									deletePet={handlerDeletePet}
								/>
							</div>
						</div>
					) : null}
					{needAdd ? (
						<div
							className={classes.wrapperModalWindow}
							onClick={(
								e: React.MouseEvent<HTMLDivElement, MouseEvent>
							): void => {
								if (e.currentTarget === e.target) {
									setNeedAdd(false);
								}
							}}
						>
							<div className={classes.editPetForm}>
								<div
									className={classes.cancelIcon}
									onClick={(): void => {
										setNeedAdd(false);
									}}
								>
									<CancelIcon fontSize="large" />
								</div>
								Здесь должно быть чудо!
								<CreatePetForm
									onPetAdded={addPet}
									petAddToggle={hadlerAddPet}
								/>
							</div>
						</div>
					) : null}
				</div>
			);
	}
};

export default UserPage;
