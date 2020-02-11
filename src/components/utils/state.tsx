import React from 'react';

const checkLogin = (): boolean => {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
};

export let isLogin = checkLogin();

export const setLogin = () => {
	return (isLogin = checkLogin());
};

export const getId = (): string | null | undefined => {
	if (isLogin) {
		return localStorage.getItem('id');
	}
};

export const userId = getId();

export const userData = {};
export const pets = {};

export const updateUserData = (user: object, store: object): void => {
	store = user;
	console.log(store);
};

export const isLoginContext = React.createContext({});
