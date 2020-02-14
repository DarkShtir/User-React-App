import React, { useCallback, useState, useEffect } from 'react';
import { CardOtherUser } from '../../components/CardOtherUser/CardOtherUser';
import Loading from '../../components/shared/Loading/Loading';
import { ErrorIndicator } from '../../components/shared/ErrorIndicator/ErrorIndicator';
import UserService from '../../services/user-service';
import classes from './UsersPage.module.scss';

const UsersPage = (): JSX.Element => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const [userList, setUserList] = useState([]);
	const [loadingState, setLoading] = useState(loadingEnum.Loading);

	const response = useCallback(async () => {
		try {
			const res = await UserService.getAllUsers();
			if (!res || res === undefined || res === null) {
				throw new Error('Не могу достучаться до сервера');
			}
			setUserList(res);
			setLoading(loadingEnum.Loaded);
		} catch (error) {
			setLoading(loadingEnum.Error);
			console.log(error);
		}
	}, [setLoading, loadingEnum.Loaded, loadingEnum.Error]);

	useEffect(() => {
		response();
	}, [response]);
	console.log(userList);
	switch (loadingState) {
		case loadingEnum.Error:
			return <ErrorIndicator />;
		case loadingEnum.Loading:
			return <Loading />;
		case loadingEnum.Loaded:
			return (
				<div className={classes.UsersPage}>
					{userList.map((oneUser: any, index: number) => {
						return <CardOtherUser user={oneUser} key={index} />;
					})}
				</div>
			);
	}
};

export default UsersPage;
