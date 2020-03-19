const checkVoidObject = (obj: object): boolean => {
	for (const key in obj) {
		return false;
	}
	return true;
};

export default checkVoidObject;
