const initialState = {
	isLogin: false,
};

const reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				isLogin: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
