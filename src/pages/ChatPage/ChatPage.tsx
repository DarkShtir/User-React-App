import React, { useEffect } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../../store/interfaces/RootState';

import { User } from '../../interfaces';
// import classes from './ChatPage.module.scss';
import loadingEnum from '../../components/utils/loadingStateEnum';
import ChatContainer from '../../containers/Chat/ChatContainer';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import Loading from '../../components/shared/Loading/Loading';
import checkVoidObject from '../../components/utils/checkVoidObject';
import { getLoginUser } from '../../store/users/users.actions';
import { getAllUserDialogAction } from '../../store/dialogs/dialogs.actions';

interface Props {
	statusApp: loadingEnum;
	loginUser: User;
	id: string;
	dialogStatus: loadingEnum;

	getLoginUser: () => void;
	getAllUserDialogAction: (id: string) => void;
}

const ChatPage: React.FC<Props> = ({
	statusApp,
	loginUser,
	id,
	dialogStatus,
	getLoginUser,
	getAllUserDialogAction,
}) => {
	useEffect(() => {
		if (checkVoidObject(loginUser)) {
			getLoginUser();
		}
	}, [getLoginUser, loginUser]);

	useEffect(() => {
		getAllUserDialogAction(id);
	}, [getAllUserDialogAction, id]);
	switch (statusApp && dialogStatus) {
		case loadingEnum.Error:
			return <ErrorIndicator error={null} />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return <ChatContainer />;
	}
};

const mapStateToProps = (state: RootState) => ({
	statusApp: state.appState.statusApp,
	loginUser: state.users.loginUser,
	id: state.users.id,
	dialogStatus: state.dialogs.dialogStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getLoginUser: () => dispatch(getLoginUser()),
	getAllUserDialogAction: (id: string) => dispatch(getAllUserDialogAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
