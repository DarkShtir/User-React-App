// import React, { useContext } from 'react';

// const MyContext = React.createContext({
// 	login: true,
// });

const isLogin = (): boolean => {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
};

export { isLogin };
