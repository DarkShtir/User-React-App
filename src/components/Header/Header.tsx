import React from 'react';
import classes from './Header.module.scss';
import { Button, ButtonGroup, Paper } from '@material-ui/core';

const Header = (): JSX.Element => {
	return (
		<Paper className={classes.Header}>
			<h2>CyberCity</h2>
			<ButtonGroup
				size="medium"
				variant="text"
				className={classes.menu_btn_group}
			>
				<Button className={classes.btn}>Главная</Button>
				<Button className={classes.btn}>Войти</Button>
				<Button className={classes.btn}>Регистрация</Button>
				<Button className={classes.btn}>Жители</Button>
			</ButtonGroup>
		</Paper>
	);
};

export default Header;
