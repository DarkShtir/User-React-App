import React, { useContext, useEffect, useState } from 'react';
import CardUser from '../../components/CardUser/CardUser';
import CardAvatar from '../../components/CardAvatar/CardAvatar';
import classes from './UserPage.module.scss';
import { isLoginContext } from '../../components/utils/state';
import userService from '../../services/user-service';
import Loading from '../../components/shared/Loading/Loading';
// import CardPets from '../../components/CardPets/CardPets';
//!!! ИСПРАВИТЬ ПОВЕДЕНИЕ СТРАНИЦЫ И ОТОБРАЖЕНИЕ ПЭТОВ!!!!!
const UserPage = (): JSX.Element => {
	const { id, activeUser, setUser } = useContext<any>(isLoginContext);
	const [loading, setLoading] = useState(true);

	const getUser = async (getId: string): Promise<void> => {
		const newUser = await userService.getUserById(getId);
		if (newUser !== undefined && newUser !== null) {
			setUser(newUser);
			setLoading(false);
		}
	};

	// const getPets = async (getId: string): Promise<void> => {
	// 	const pets = await userService.getUserPets(getId);
	// 	if (pets !== undefined && pets !== null) {
	// 		// console.log(pets);
	// 		setPets(pets);
	// 	}
	// };

	useEffect(() => {
		if (id && id !== undefined && id !== null) {
			getUser(id);
			// getPets(id);
			// if (activeUser && pets) {
			// 	setLoading(false);
			// }
		}

		return () => {
			console.log('cleared');
		};
	}, [id]);

	// const createPetsCards = (pets: any) => {
	// 	pets.forEach((pet: any) => {
	// 		return <CardPets pets={pet} />;
	// 	});
	// };
	// const [user] = useState({
	// 	_id: 'derfonebfndf',
	// 	login: 'Matron-P',
	// 	password: '123456',
	// 	firstName: 'Matrona',
	// 	lastName: 'Chapaevna',
	// 	nat: 'BY',
	// 	gender: 'Female',
	// 	phone: '+375 29 1234567',
	// 	avatarUrl:
	// 		'https://i.pinimg.com/originals/5a/67/a0/5a67a00e18bb0f27c55b05cbb0791b54.jpg',
	// });

	return (
		<div className={classes.UserPage}>
			{loading ? (
				<Loading />
			) : (
				<>
					<CardAvatar user={activeUser} />
					<CardUser user={activeUser} />
					{/* {createPetsCards(pets)} */}
					{/* <CardPets pets={pets} /> */}
				</>
			)}
		</div>
	);
};

export default UserPage;
