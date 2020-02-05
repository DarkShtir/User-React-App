import React from 'react';
import classes from './Header.module.scss';
import { Button, ButtonGroup, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
	return (
		<Paper className={classes.Header}>
			<h2>CyberSELO</h2>
			<ButtonGroup
				size="medium"
				variant="text"
				className={classes.menu_btn_group}
			>
				<Button className={classes.btn} component={Link} to="/">
					Главная
				</Button>
				<Button className={classes.btn} component={Link} to="/login">
					Войти
				</Button>
				<Button className={classes.btn} component={Link} to="/registration">
					Регистрация
				</Button>
				<Button className={classes.btn} component={Link} to="/user-list">
					Местные
				</Button>
			</ButtonGroup>
		</Paper>
	);
};

export default Header;
