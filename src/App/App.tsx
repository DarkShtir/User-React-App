import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Main, Login, Reg, UsersList, User, Edit } from '../pages/pages';
import classes from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

import {
	// isLogin,
	// userId,
	// userData,
	// updateUserData,
	// setLogin,
	isLoginContext,
	getId,
	checkLogin,
} from '../components/utils/state';

import {
	ProtectedRouteProps,
	PrivateRouter,
} from '../components/HOC/PrivateRouter';
import UsersPage from '../pages/UsersPage/UsersPage';

const App: React.FC = () => {
	const [login, setLogin] = useState(checkLogin());
	const [id, setUserId] = useState(getId());
	const [activeUser, setUser] = useState({});
	const defaultProtectedRouteProps: ProtectedRouteProps = {
		isAuthenticated: login,
		authenticationPath: '/login',
	};
	// const [pets, setPets] = useState({});

	return (
		<Container className={classes.App}>
			<isLoginContext.Provider
				value={{
					login,
					setLogin,
					id,
					setUserId,
					activeUser,
					setUser,
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
					<Route path="/users-cards" component={UsersPage} />
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
