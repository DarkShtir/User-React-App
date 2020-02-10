import React, { useContext } from 'react';
import classes from './Header.module.scss';
import { Button, Paper, Container } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../../../services/user-service';
import { isLoginContext } from '../../utils/state';

const Header: React.FC = (): JSX.Element => {
	const { login, setLogin, id } = useContext<any>(isLoginContext);

	const history = useHistory();

	const logout = (): void => {
		UserService.logout();
		setLogin(false);
		history.push('/');
	};

	return (
		<Paper className={classes.Header}>
			<h2>CyberSELO</h2>
			<Container className={classes.menu_btn_group}>
				<Button className={classes.btn} component={Link} to="/">
					Главная
				</Button>
				{login ? (
					<>
						<Button className={classes.btn} component={Link} to={`/user/${id}`}>
							Моя Хата
						</Button>
						<Button className={classes.btn} onClick={logout}>
							Вайсци атседава
						</Button>
					</>
				) : (
					<React.Fragment>
						<Button className={classes.btn} component={Link} to="/login">
							Войти
						</Button>
						<Button className={classes.btn} component={Link} to="/registration">
							Регистрация
						</Button>
					</React.Fragment>
				)}

				<Button className={classes.btn} component={Link} to="/user-list">
					Местные
				</Button>
			</Container>
		</Paper>
	);
};

export default Header;
