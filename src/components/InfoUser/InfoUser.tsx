import React from 'react';
import classes from './InfoUser.module.scss';
import CardUser from '../CardUser/CardUser';
import CardPets from '../CardPets/CardPets';
import { Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Pet, User, Album } from '../../interfaces';
import CardAlbum from '../CardAlbum/CardAlbum';
import { RootState } from '../../store/interfaces/RootState';
import { connect } from 'react-redux';

interface Props {
	user: User | null;
	guest: boolean;
	pets: [Pet] | null;
	login: boolean;
	handlerEditPet: (pet: Pet) => void;
	setNeedAdd: (trueOrFalse: boolean) => void;
	albums: [Album];
}

const InfoUser: React.FC<Props> = ({
	user,
	guest,
	pets,
	login,
	handlerEditPet,
	setNeedAdd,
	albums,
}) => {
	if (user === null) {
		throw new Error();
	}
	// console.log(login);
	return (
		<div className={classes.InfoUser}>
			<CardUser user={user} guest={guest} />
			{(pets && pets.length > 0 && login) || !guest ? (
				<div className={classes.pets}>
					<Typography variant="h5" className={classes.typography}>
						My pets
					</Typography>
					{pets !== null ? (
						<>
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
						</>
					) : null}

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
			<CardAlbum albums={albums} />
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	user: state.users.activeUser,
	guest: state.users.guest,
	pets: state.pets.pets,
	login: state.users.login,
});

// const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({});

export default connect(mapStateToProps)(InfoUser);
// export default InfoUser;
