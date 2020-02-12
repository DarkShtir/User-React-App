import React, { useCallback, useState, useEffect } from 'react';
import UserService from '../../services/user-service';
import { CardOtherUser } from '../../components/CardOtherUser/CardOtherUser';
import Loading from '../../components/shared/Loading/Loading';
import classes from './UsersPage.module.scss';

const UsersPage = () => {
	const [userList, setUserList] = useState([]);
	const [loading, setLoading] = useState(true);

	const response = useCallback(async () => {
		try {
			const res = await UserService.getAllUsers();
			setUserList(res);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}, [setLoading]);

	useEffect(() => {
		response();
	}, [response]);
	console.log(userList);
	switch (loading) {
		case true:
			return <Loading />;
		case false:
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
