import React, { useEffect, useState } from 'react';
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
} from '../../store/users/users.actions';
import { addPetAction } from '../../store/pets/pets.actions';

interface Props {
	activeUser: User | null;
	id: string;
	guestId: string;
	albums: [Album] | null;
	pets: [Pet] | null;
	editPet: Pet | null;
	setGuestId: (guestId: string) => void;
	setGuest: (guest: boolean) => void;
	getUser: (id: string) => void;
	addPet: (pet: Pet) => void;
}

const UserPage: React.FC<Props & RouteComponentProps> = ({
	id,
	guestId,
	activeUser,
	albums,
	pets,
	editPet,
	setGuestId,
	setGuest,
	getUser,
	addPet,
	...props
}): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}

	//TODO Перенести всё это в СТОР
	const [loading, setLoading] = useState(loadingEnum.Loading);
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
		if (
			props.match.url.slice(6) !== undefined &&
			guestId !== props.match.url.slice(6)
		) {
			setGuestId(props.match.url.slice(6));
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

	const hadlerAddPet = (): void => {
		setNeedAdd((prevState: boolean): any => !prevState);
	};

	const addNewPet = (pet: Pet) => {
		const newPet = { ...pet, ...{ ownerId: id } };
		addPet(newPet);
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

							<InfoUser setNeedAdd={setNeedAdd} albums={albums} />
						</>
					) : null}
					{editPet ? <EditPet /> : null}
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
	editPet: state.pets.editPet,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setGuestId: (guestId: string) => dispatch(setGuestIdAction(guestId)),
	setGuest: (guest: boolean) => dispatch(setGuestAction(guest)),
	getUser: (id: string) => dispatch(getUser(id)),
	addPet: (pet: Pet) => dispatch(addPetAction(pet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
