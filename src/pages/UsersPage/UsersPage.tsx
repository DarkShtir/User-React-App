import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardOtherUser from '../../components/CardOtherUser/CardOtherUser';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import loadingEnum from '../../components/utils/loadingStateEnum';
import Loading from '../../components/shared/Loading/Loading';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import { RootState } from '../../store/interfaces/RootState';
import { User } from '../../interfaces';
import classes from './UsersPage.module.scss';
import { Action, Dispatch } from 'redux';
import { loading } from '../../store/appState/appState.actions';

interface Props {
	users: [User] | null;
	statusApp: loadingEnum;
	loading: () => void;
}

const UsersPage: React.FC<Props> = ({
	users,
	statusApp,
	loading,
}): JSX.Element => {
	//!!Спросить про такую конструкуцию рендера, норм ли?
	useEffect(() => {
		loading();
	}, [loading]);
	const renderUsersCards = () => {
		if (users !== null && users.length > 0) {
			return (
				<div className={classes.usersCards}>
					{users.map((oneUser: any, index: number) => {
						return <CardOtherUser user={oneUser} key={index} />;
					})}
				</div>
			);
		} else {
			return (
				<h3 className={classes.notFoundMessage}>
					Такого пользователя не найдено!
				</h3>
			);
		}
	};

	return (
		<div className={classes.UsersPage}>
			<SearchPanel />

			{(function() {
				switch (statusApp) {
					case loadingEnum.Error:
						return <ErrorIndicator error={null} />;
					case loadingEnum.Loading:
						return <Loading />;
					case loadingEnum.Loaded:
						return renderUsersCards();
				}
			})()}
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	users: state.users.users,
	statusApp: state.appState.statusApp,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	loading: () => dispatch(loading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
