import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Paper, Container } from '@material-ui/core';
import {
	logoutUserAction,
	setUserIdAction,
	putActiveAlbum,
} from '../../../store/users/users.actions';
import { RootState } from '../../../store/interfaces/RootState';
import classes from './Header.module.scss';

interface Props {
	login: boolean;
	id: string;
	logoutUser: () => void;
	setUserId: (id: string) => void;
	putActiveAlbum: (albumId: string) => void;
}

const Header: React.FC<Props> = ({
	login,
	id,
	logoutUser,
	putActiveAlbum,
}): JSX.Element => {
	const history = useHistory();

	const logout = (): void => {
		logoutUser();
		history.push('/');
	};

	return (
		<Paper className={classes.Header}>
			<h2>CyberSELO</h2>
			<Container
				className={classes.menu_btn_group}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target !== event.currentTarget) {
						putActiveAlbum('');
					}
				}}
			>
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

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	logoutUser: () => dispatch(logoutUserAction()),
	setUserId: (id: string) => dispatch(setUserIdAction(id)),
	putActiveAlbum: (albumId: string) => dispatch(putActiveAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
