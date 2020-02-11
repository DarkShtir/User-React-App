import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Main, Login, Reg, UsersList, User, Edit } from '../pages/pages';
import classes from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

import {
	isLogin,
	userId,
	isLoginContext,
	userData,
	updateUserData,
	getId,
	setLogin,
} from '../components/utils/state';

import {
	ProtectedRouteProps,
	PrivateRouter,
} from '../components/HOC/PrivateRouter';

const defaultProtectedRouteProps: ProtectedRouteProps = {
	isAuthenticated: setLogin(),
	authenticationPath: '/login',
};

const App: React.FC = () => {
	const [login, setLogin] = useState<any>(isLogin);
	const [id, setUserId] = useState<any>(userId);
	const [activeUser, setUser] = useState();
	const [pets, setPets] = useState();

	return (
		<Container className={classes.App}>
			<isLoginContext.Provider
				value={{
					login,
					setLogin,
					id,
					setUserId,
					userData,
					updateUserData,
					activeUser,
					setUser,
					getId,
					pets,
					setPets,
				}}
			>
				<Header />
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/registration" component={Reg} />
					<PrivateRouter
						{...defaultProtectedRouteProps}
						exact={true}
						path={`/user/${id}`}
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
			</isLoginContext.Provider>
		</Container>
	);
};

export default App;
