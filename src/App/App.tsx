import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';
import { isLoginContext } from '../components/utils/state';
import { RootState } from '../store/interfaces/RootState';
import classes from './App.module.scss';

import {
	ProtectedRouteProps,
	PrivateRouter,
} from '../components/HOC/PrivateRouter';

import {
	Main,
	Login,
	Reg,
	UsersList,
	User,
	Edit,
	UsersPage,
	UserAlbum,
	UserAlbums,
} from '../pages/pages';

interface Props {
	login: boolean;
	id: string;
}

const App: React.FC<Props> = ({ login, id }) => {
	const [activeUser, setUser] = useState({});

	const defaultProtectedRouteProps: ProtectedRouteProps = {
		isAuthenticated: login,
		authenticationPath: '/login',
	};

	return (
		<Container className={classes.App}>
			<isLoginContext.Provider
				value={{
					activeUser,
					setUser,
				}}
			>
				<Header />
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/registration" component={Reg} />
					{/* <PrivateRouter
						{...defaultProtectedRouteProps}
						exact={true}
						path={`/user/${id}`}
						component={User}
					/> */}
					<PrivateRouter
						{...defaultProtectedRouteProps}
						exact={true}
						path="/user/:id/"
						component={User}
					/>
					{/* <Route path="/user/:id/" component={User} exact /> */}
					<Route path="/user-list" component={UsersList} />
					<Route path={`/user/${id}/edit/`} component={Edit} />
					<Route path="/users-cards" component={UsersPage} />
					<Route path="/album" component={UserAlbum} />
					<Route path="/albums" component={UserAlbums} />
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

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
});

export default connect(mapStateToProps)(App);
