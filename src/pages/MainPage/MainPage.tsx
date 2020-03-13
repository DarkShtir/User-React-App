import React from 'react';
import { Paper } from '@material-ui/core';
import classes from './MainPage.module.scss';
import Loading from '../../components/shared/Loading/Loading';

const MainPage: React.FC = (): JSX.Element => {
	return (
		<div className={classes.MainPage}>
			<Paper className={classes.paperWrapper}>
				<h2>
					Welcome <p>атседава</p> !
				</h2>
				<h3>
					Загрузка тут только для красоты, не жди, а смело переходи на другие
					страницы
				</h3>
				<Loading />
			</Paper>
		</div>
	);
};

export default MainPage;
