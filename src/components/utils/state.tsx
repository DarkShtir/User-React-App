import React from 'react';

//функция проверки токнеа в локали
export const checkLogin = (): boolean => {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
};
//Получение ID
export const getId = (): string => {
	const id = localStorage.getItem('id');
	if (checkLogin() && id) {
		return id;
	} else {
		return '';
	}
};

//Общий контекст
export const isLoginContext = React.createContext({});

//Константа с тру или фолс на проверке есть ли токен в локали
// export let isLogin = checkLogin();
// isLogin();

// export let isLogin = () => {
// 	checkLogin();
// };

//Установка IsLogin  в новое значение, надо ли??
// export const setLogin = () => {
// 	return (isLogin = checkLogin());
// };

//константа с ID в зависимости, есть ли токен в локали, и есть ли там id
// export const userId = getId();

//Объект юзера, но можно же оперировать стейтом, вообще не понимаю зачем он тут
// export const userData = {};
// export const pets = {};

//экспорт функции апдейта юзера в контексте, нужно ли????
// export const updateUserData = (user: object, store: object): void => {
// 	store = user;
// 	console.log(store);
// };
