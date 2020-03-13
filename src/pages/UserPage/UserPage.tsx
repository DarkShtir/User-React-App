import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import CardAvatar from '../../components/CardAvatar/CardAvatar';
import Loading from '../../components/shared/Loading/Loading';
import CreatePet from '../../components/CreatePet/CreatePet';
import EditPet from '../../components/EditPet/EditPet';
import InfoUser from '../../components/InfoUser/InfoUser';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';

import { Pet, User, Album } from '../../interfaces';

import classes from './UserPage.module.scss';
import { RootState } from '../../store/interfaces/RootState';
import { setGuestIdAction } from '../../store/users/users.actions';
import { addPetAction } from '../../store/pets/pets.actions';
import loadingEnum from '../../components/utils/loadingStateEnum';
import { loading } from '../../store/appState/appState.actions';

interface Props {
	activeUser: User | null;
	id: string;
	guestId: string;
	albums: [Album] | null;
	pets: [Pet] | null;
	editPet: Pet | null;
	setGuestId: (guestId: string) => void;
	addPet: (pet: Pet) => void;
	statusApp: loadingEnum;
	loading: () => void;
}

const UserPage: React.FC<Props & RouteComponentProps> = ({
	id,
	guestId,
	activeUser,
	albums,
	pets,
	editPet,
	setGuestId,
	addPet,
	statusApp,
	loading,
	...props
}): JSX.Element => {
	//TODO Перенести всё это в СТОР
	const [needAdd, setNeedAdd] = useState(false);

	useEffect(() => {
		if (
			props.match.url.slice(6) !== undefined &&
			guestId !== props.match.url.slice(6)
		) {
			setGuestId(props.match.url.slice(6));
		}
	}, [guestId, props.match.url, setGuestId]);

	const hadlerAddPet = (): void => {
		setNeedAdd((prevState: boolean): any => !prevState);
	};

	const addNewPet = (pet: Pet) => {
		const newPet = { ...pet, ...{ ownerId: id } };
		addPet(newPet);
	};

	switch (statusApp) {
		case loadingEnum.Error:
			return <ErrorIndicator error={null} />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return (
				<div className={classes.UserPage}>
					<>
						<CardAvatar />
						<InfoUser setNeedAdd={setNeedAdd} />
					</>
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
	statusApp: state.appState.statusApp,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setGuestId: (guestId: string) => dispatch(setGuestIdAction(guestId)),
	addPet: (pet: Pet) => dispatch(addPetAction(pet)),
	loading: () => dispatch(loading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
