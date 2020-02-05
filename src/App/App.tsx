import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import MainPage from '../pages/MainPage/MainPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import UsersPage from '../pages/UsersPage/UsersPage';
import UsersListPage from '../pages/UsersListPage/UsersListPage';
import EditPage from '../pages/EditPage/EditPage';
import classes from './App.module.scss';

export class App extends Component<{}, {}> {
	render(): JSX.Element {
		return (
			<Container className={classes.App}>
				<MainPage />
				<LoginPage />
				<RegistrationPage />
				<UsersPage />
				<UsersListPage />
				<EditPage />
			</Container>
		);
	}
}

export default App;
