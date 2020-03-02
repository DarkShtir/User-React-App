import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CardAvatar from '../../components/CardAvatar/CardAvatar';
import Loading from '../../components/shared/Loading/Loading';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import CreatePet from '../../components/CreatePet/CreatePet';
import EditPet from '../../components/EditPet/EditPet';
import InfoUser from '../../components/InfoUser/InfoUser';

import { userService } from '../../services/services';
import { Pet, User, Album } from '../../interfaces';

import classes from './UserPage.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Dispatch, Action } from 'redux';
import {
	setGuestIdAction,
	setGuestAction,
	getUser,
	getUserAlbums,
} from '../../store/users/users.actions';
import {
	deletePetAction,
	addPetAction,
	updatePetAction,
	getUserPets,
} from '../../store/pets/pets.actions';

interface Props {
	activeUser: User | null;
	id: string;
	guestId: string;
	albums: [Album] | null;
	pets: [Pet] | null;
	setGuestId: (guestId: string) => void;
	setGuest: (guest: boolean) => void;
	getUser: (id: string) => void;
	getPets: (id: string) => void;
	getAlbums: (id: string) => void;
	deletePet: (petId: string) => void;
	addPet: (pet: Pet) => void;
	updatePet: (id: string, pet: Pet) => void;
}

const UserPage: React.FC<Props & RouteComponentProps> = ({
	activeUser,
	id,
	guestId,
	albums,
	pets,
	setGuestId,
	setGuest,
	getUser,
	getPets,
	deletePet,
	addPet,
	updatePet,
	...props
}): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}

	//TODO Перенести всё это в СТОР
	const [loading, setLoading] = useState(loadingEnum.Loading);
	const [editPet, setEditPet] = React.useState<any>();
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

	useEffect(() => {
		setGuestId(props.match.url.slice(6));
		getUser(guestId);
		if (id && id !== guestId) {
			setGuest(true);
		} else {
			setGuest(false);
		}
		setLoading(loadingEnum.Loaded);
	}, [
		getUser,
		guestId,
		id,
		props.match.url,
		setGuestId,
		loadingEnum.Loaded,
		setGuest,
	]);

	const handlerDeletePet = (petId: string): any => {
		deletePet(petId);
		setEditPet(null);
	};

	const updateOldPet = useCallback(
		async (petId: string, pet: Pet): Promise<void> => {
			try {
				updatePet(petId, pet);
				getPets(id);

				setEditPet(null);
			} catch (error) {
				console.log(error);
			}
		},
		[id, getPets, updatePet]
	);

	const handlerEditPet = (pet: Pet): void => {
		setEditPet(pet);
	};

	const hadlerAddPet = (): void => {
		setNeedAdd((prevState: boolean): any => !prevState);
	};

	const addNewPet = (pet: Pet) => {
		const newPet = { ...pet, ...{ ownerId: id } };
		addPet(newPet);
		getPets(id);
	};

	switch (loading) {
		case loadingEnum.Error:
			return <ErrorIndicator error={null} />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return (
				<div className={classes.UserPage}>
					{activeUser && pets && albums ? (
						<>
							<CardAvatar
								setUserAvatar={setUserAvatar}
								setUserQuotes={setUserQuotes}
							/>

							<InfoUser
								handlerEditPet={handlerEditPet}
								setNeedAdd={setNeedAdd}
								albums={albums}
							/>
						</>
					) : null}
					{editPet ? (
						<EditPet
							setEditPet={setEditPet}
							editPet={editPet}
							updatePet={updateOldPet}
							handlerDeletePet={handlerDeletePet}
						/>
					) : null}
					{needAdd ? (
						<CreatePet
							setNeedAdd={setNeedAdd}
							addPet={addNewPet}
							hadlerAddPet={hadlerAddPet}
						/>
					) : null}
				</div>
			);
	}
};

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	guestId: state.users.guestId,
	activeUser: state.users.activeUser,
	albums: state.users.albums,
	pets: state.pets.pets,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setGuestId: (guestId: string) => dispatch(setGuestIdAction(guestId)),
	setGuest: (guest: boolean) => dispatch(setGuestAction(guest)),
	getUser: (id: string) => dispatch(getUser(id)),
	getUserPets: (id: string) => dispatch(getUserPets(id)),
	getUserAlbums: (id: string) => dispatch(getUserAlbums(id)),
	deletePet: (petId: string) => dispatch(deletePetAction(petId)),
	addPet: (pet: Pet) => dispatch(addPetAction(pet)),
	updatePet: (id: string, pet: Pet) => dispatch(updatePetAction(id, pet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
