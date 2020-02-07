import React, { useContext, useState } from 'react';
import { Container } from '@material-ui/core';
import { Main, Login, Reg, UsersList, User, Edit } from '../pages/pages';
import classes from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

import {
	ProtectedRouteProps,
	PrivateRouter,
} from '../components/HOC/PrivateRouter';

const MyContext = React.createContext({
	login: true,
});

const defaultProtectedRouteProps: ProtectedRouteProps = {
	isAuthenticated: true,
	authenticationPath: '/login',
};

const App: React.FC = () => {
	const { login } = useContext(MyContext);

	console.log(login);
	return (
		<Container className={classes.App}>
			<Header />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/registration" component={Reg} />
				<PrivateRouter
					{...defaultProtectedRouteProps}
					exact={true}
					path="/user/:id"
					component={User}
				/>
				<Route path="/user-list" component={UsersList} />
				<Route path="/user/:id/edit" component={Edit} />
				<Route exact path="/" component={Main} />
				<Route
					render={(): JSX.Element => {
						return <h2>Page Not found</h2>;
					}}
				/>
			</Switch>
			<Footer />
		</Container>
	);
};

export { App, MyContext };
