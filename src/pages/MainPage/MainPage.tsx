import React from 'react';
import { Paper } from '@material-ui/core';
import classes from './MainPage.module.scss';
import Loading from '../../components/shared/Loading/Loading';

const MainPage = (): JSX.Element => {
	return (
		<Paper className={classes.MainPage}>
			<h2>
				Welcome <p>атседава</p> !
			</h2>
			<h3>
				Загрузка тут только для красоты, не жди, а смело переходи на другие
				страницы
			</h3>
			<Loading />
		</Paper>
	);
};

export default MainPage;
