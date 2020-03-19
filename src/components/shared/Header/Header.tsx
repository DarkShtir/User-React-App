import React, { useContext } from 'react';
import classes from './Header.module.scss';
import { Button, Paper, Container } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import UserService from '../../../services/user-service';
import { isLoginContext } from '../../utils/state';

const Header: React.FC = (): JSX.Element => {
	const { login, setLogin, id, setUserId, setUser } = useContext<any>(
		isLoginContext
	);

	const history = useHistory();

	const logout = (): void => {
		UserService.logout();
		setLogin(false);
		setUser({});
		setUserId('');
		history.push('/');
	};

	return (
		<Paper className={classes.Header}>
			<h2>CyberSELO</h2>
			<Container className={classes.menu_btn_group}>
				<Button
					exact
					className={classes.btn}
					component={NavLink}
					to="/"
					activeClassName={classes.qwe}
				>
					Главная
				</Button>
				{login ? (
					<>
						<Button
							className={classes.btn}
							component={NavLink}
							to={`/user/${id}`}
							// activeStyle={{ color: 'yellowgreen' }}

							activeClassName={classes.qwe}
						>
							Моя Хата
						</Button>
						<Button className={classes.btn} onClick={logout}>
							Вайсци атседава
						</Button>
					</>
				) : (
					<React.Fragment>
						<Button
							className={classes.btn}
							component={NavLink}
							to="/login"
							activeClassName={classes.qwe}
						>
							Войти
						</Button>
						<Button
							className={classes.btn}
							component={NavLink}
							to="/registration"
							activeClassName={classes.qwe}
						>
							Регистрация
						</Button>
					</React.Fragment>
				)}

				<Button
					className={classes.btn}
					component={NavLink}
					to="/users-cards"
					activeClassName={classes.qwe}
				>
					Местные
				</Button>
				<Button
					className={classes.btn}
					component={NavLink}
					to="/user-list"
					activeClassName={classes.qwe}
				>
					Не суйся, для бацьки!
				</Button>
			</Container>
		</Paper>
	);
};

export default Header;
