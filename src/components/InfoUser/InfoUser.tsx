import React from 'react';
import classes from './InfoUser.module.scss';
import CardUser from '../CardUser/CardUser';
import CardPets from '../CardPets/CardPets';
import { Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Pet, User, Album } from '../../interfaces';
import CardAlbum from '../CardAlbum/CardAlbum';

interface Props {
	activeUser: User;
	guest: boolean;
	pets: [Pet];
	login: boolean;
	handlerEditPet: (pet: Pet) => void;
	setNeedAdd: (trueOrFalse: boolean) => void;
	albums: Album;
}

const InfoUser: React.FC<Props> = ({
	activeUser,
	guest,
	pets,
	login,
	handlerEditPet,
	setNeedAdd,
	albums,
}) => {
	return (
		<div className={classes.InfoUser}>
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
			<CardAlbum albums={albums} />
		</div>
	);
};

export default InfoUser;
