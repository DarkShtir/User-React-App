import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { Main, Login, Reg, UsersList, User, Edit } from '../pages/pages';
import classes from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

interface State {
	login: boolean;
}

export class App extends Component<{}, State> {
	state = {
		login: false,
	};

	render(): JSX.Element {
		return (
			<Container className={classes.App}>
				<Header />
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/registration" component={Reg} />
					<Route exact path="/user/:id" component={User} />
					<Route path="/user-list" component={UsersList} />
					<Route path="/user/:id/edit" component={Edit} />
					<Route exact path="/" component={Main} />
				</Switch>
				<Footer />
			</Container>
		);
	}
}

export default App;
