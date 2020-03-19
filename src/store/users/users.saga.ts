import { takeEvery, put, select } from 'redux-saga/effects';
import {
	Actions as UserActions,
	putUser,
	setUserIdAction,
	setGuestAction,
	updateUserAction,
	putUsersInState,
	putLoginUserInState,
} from './users.actions';
import { userService } from '../../services/services';
import { getUserPets, logoutPetAction } from '../pets/pets.actions';
import checkVoidObject from '../../components/utils/checkVoidObject';
import { logoutDialogAction } from '../dialogs/dialogs.actions';
import {
	loading,
	loadingSuccessful,
	loadingError,
	setLoginAction,
} from '../appState/appState.actions';
import { getUserAlbums } from '../albums/albums.actions';

//Workers
function* workerSetGuestId(actions: any) {
	try {
		yield put(loading());
		const newUser = yield userService.getUserById(actions.payload);
		const id = yield select(state => state.users.id);
		const guestId = yield select(state => state.users.guestId);
		const login = yield select(state => state.appState.login);
		if (id !== guestId && id && guestId) {
			yield put(setGuestAction(true));
		} else {
			yield put(setGuestAction(false));
		}
		if (login && newUser && newUser.id !== guestId) {
			yield put(putUser(newUser));
			yield put(getUserPets(guestId));
			yield put(getUserAlbums(guestId));
		}
		yield put(loadingSuccessful());
	} catch (error) {
		yield put(loadingError());
	}
}

function* workerLogoutUser() {
	yield userService.logout();
	yield UserActions.LOGOUT_USER;
	yield put(logoutPetAction());
	yield put(logoutDialogAction());
	yield put(setLoginAction(false));
	yield put(setUserIdAction(''));
}
function* workerSetUserAvatar(actions: any) {
	const id = yield select(state => state.users.id);
	const newAvatar = yield userService.setAvatar(id, actions.payload);
	yield put(updateUserAction(id, newAvatar));
}
function* workerSetUserQuotes(actions: any) {
	const id = yield select(state => state.users.id);
	yield put(updateUserAction(id, { quotes: actions.payload }));
}
function* workerUpdateUser(actions: any) {
	yield userService.updateUser(actions.payload.id, actions.payload.user);
	const newUser = yield userService.getUserById(actions.payload.id);
	yield put(putUser(newUser));
}

function* workerGetUsersByName(actions: any) {
	try {
		yield put(loading());
		const users = yield userService.getAllUsersByName(actions.payload);
		yield put(putUsersInState(users));
		const usersFromState = yield select(state => state.users.users);
		if (!checkVoidObject(usersFromState[0]) || usersFromState.length === 0) {
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerGetLoginUser() {
	yield put(loading());
	try {
		const id = yield localStorage.getItem('id');
		const loginUser = yield userService.getUserById(id);
		yield put(putLoginUserInState(loginUser));
		yield put(loadingSuccessful());
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerLoginUser(actions: any) {
	try {
		yield put(loading());
		const user = yield userService.login(actions.payload);
		yield put(putLoginUserInState(user));
		const id = yield localStorage.getItem('id');
		yield put(setUserIdAction(id));

		const loginUser = yield select(state => state.users.loginUser);
		// const newId = yield select(state => state.users.id);
		console.log(loginUser);
		if (!loginUser && loginUser === undefined) {
			setLoginAction(false);
			throw new Error('Пользователь на найден!!');
		} else {
			yield put(setLoginAction(true));
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerAddUser(actions: any) {
	try {
		yield put(loading());
		const user = yield userService.addUser(actions.payload);
		yield put(putLoginUserInState(user));
		const id = yield localStorage.getItem('id');
		yield put(setUserIdAction(id));

		const loginUser = yield select(state => state.users.loginUser);
		// const newId = yield select(state => state.users.id);
		console.log(loginUser);
		if (!loginUser && loginUser === undefined) {
			setLoginAction(false);
			throw new Error('Ошибка регистрации!');
		} else {
			yield put(setLoginAction(true));
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}

//Watchers
export function* usersWatcher() {
	yield takeEvery(UserActions.SET_GUEST_ID, workerSetGuestId);
	yield takeEvery(UserActions.LOGOUT_USER, workerLogoutUser);
	yield takeEvery(UserActions.SET_USER_AVATAR, workerSetUserAvatar);
	yield takeEvery(UserActions.SET_USER_QUOTES, workerSetUserQuotes);
	yield takeEvery(UserActions.UPDATE_USER, workerUpdateUser);
	yield takeEvery(UserActions.GET_USERS_BY_NAME, workerGetUsersByName);
	yield takeEvery(UserActions.GET_LOGIN_USER, workerGetLoginUser);
	yield takeEvery(UserActions.LOGIN_USER, workerLoginUser);
	yield takeEvery(UserActions.ADD_USER, workerAddUser);
}

//Export
export default function* rootUserSaga() {
	yield usersWatcher();
}
