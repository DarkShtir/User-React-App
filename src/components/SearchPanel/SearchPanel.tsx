import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import classes from './SearchPanel.module.scss';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { getUsersByName } from '../../store/users/users.actions';

interface Props {
	getUsersByName: (query: string) => void;
}

const SearchPanel: React.FC<Props> = ({ getUsersByName }) => {
	const [query, setQuery] = useState('');

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			getUsersByName(query);
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getUsersByName: (query: string) => dispatch(getUsersByName(query)),
});

export default connect(null, mapDispatchToProps)(SearchPanel);
