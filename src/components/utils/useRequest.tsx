import React, { useState, useEffect } from 'react';

export const useRequest: React.FC = (request: any): any => {
	const [dataState, setDataState] = useState(null);

	useEffect(() => {
		let cancelled = false;
		request().then((data: any) => !cancelled && setDataState(data));
		return (): void => {
			cancelled = true;
		};
	}, [request]);

	return dataState;
};
