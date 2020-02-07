import React, { useContext, useState } from 'react';
import classes from './Header.module.scss';
import { Button, Paper, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserService from '../../../services/user-service';
import { isLogin } from '../../utils/isLogin';
import { MyContext } from '../../../App/App';

const Header: React.FC = (): JSX.Element => {
	const logout = (): void => {
		// const token = localStorage.getItem('token');
		UserService.logout();
	};

	const { login } = useContext(MyContext);

	return (
		<Paper className={classes.Header}>
			<h2>CyberSELO</h2>
			<Container className={classes.menu_btn_group}>
				<Button className={classes.btn} component={Link} to="/">
					Главная
				</Button>
				{!isLogin() ? (
					<React.Fragment>
						<Button className={classes.btn} component={Link} to="/login">
							Войти
						</Button>
						<Button className={classes.btn} component={Link} to="/registration">
							Регистрация
						</Button>
					</React.Fragment>
				) : (
					<>
						<Button className={classes.btn} component={Link} to="/user/:id">
							Моя Хата
						</Button>
						<Button className={classes.btn} onClick={logout}>
							Вайсци атседава
						</Button>
					</>
				)}

				<Button className={classes.btn} component={Link} to="/user-list">
					Местные
				</Button>
			</Container>
		</Paper>
	);
};

export default Header;
