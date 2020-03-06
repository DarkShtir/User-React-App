import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import classes from './SearchPanel.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Action, Dispatch } from 'redux';
import { getUsersByName } from '../../store/users/users.actions';

interface Props {
	getUsersByName: (query: string) => void;
}

const SearchPanel: React.FC<Props> = ({ getUsersByName }) => {
	const [query, setQuery] = useState('');
	// const [displayMessage, setDisplayMessage] = useState('');

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			getUsersByName(query);
			// setDisplayMessage(query);
		}, 800);
		return () => clearTimeout(timeOutId);
	}, [query, getUsersByName]);

	return (
		<div className={classes.SearchPanel}>
			<TextField
				id="outlined-search"
				label="Поиск по имени"
				type="search"
				variant="outlined"
				value={query}
				onChange={event => setQuery(event.target.value)}
			/>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	// id: state.users.id,
	// guestId: state.users.guestId,
	// activeUser: state.users.activeUser,
	// albums: state.users.albums,
	// pets: state.pets.pets,
	// editPet: state.pets.editPet,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getUsersByName: (query: string) => dispatch(getUsersByName(query)),
	// setGuestId: (guestId: string) => dispatch(setGuestIdAction(guestId)),
	// addPet: (pet: Pet) => dispatch(addPetAction(pet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
