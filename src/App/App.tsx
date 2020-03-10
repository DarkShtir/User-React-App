import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';
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
	Chat,
} from '../pages/pages';
import { getUser } from '../store/users/users.actions';
import { Action, Dispatch } from 'redux';

interface Props {
	login: boolean;
	id: string;
	getUser: (id: string) => void;
}

const App: React.FC<Props> = ({ login, id }) => {
	const defaultProtectedRouteProps: ProtectedRouteProps = {
		isAuthenticated: login && !!id,
		authenticationPath: '/login',
	};

	return (
		<Container className={classes.App}>
			<Header />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/registration" component={Reg} />
				<PrivateRouter
					{...defaultProtectedRouteProps}
					exact={true}
					path="/user/:id/"
					component={User}
				/>
				<PrivateRouter
					{...defaultProtectedRouteProps}
					exact={true}
					path="/chat-room/"
					component={Chat}
				/>
				<Route path="/user-list" component={UsersList} />
				<Route path={`/user/${id}/edit/`} component={Edit} />
				<Route path="/users-cards" component={UsersPage} />
				<Route path="/album/:id/" component={UserAlbum} />
				<Route path="/albums" component={UserAlbums} />
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

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getUser: (id: string) => dispatch(getUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
