import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
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
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';
import { isLoginContext, getId, checkLogin } from '../components/utils/state';
import {
	ProtectedRouteProps,
	PrivateRouter,
} from '../components/HOC/PrivateRouter';
import classes from './App.module.scss';

const App: React.FC = () => {
	const [login, setLogin] = useState(checkLogin());
	const [id, setUserId] = useState(getId());
	const [activeUser, setUser] = useState({});

	const defaultProtectedRouteProps: ProtectedRouteProps = {
		isAuthenticated: login,
		authenticationPath: '/login',
	};

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

export default App;
