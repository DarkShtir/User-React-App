import React from 'react';
import { Paper } from '@material-ui/core';
import classes from './MainPage.module.scss';
import Loading from '../../components/shared/Loading/Loading';
// import { subscribeToTimer } from '../../api';

const MainPage: React.FC = (): JSX.Element => {
	//TODO Socket chat
	// const [timeStamp, setTimeStamp] = useState();
	// useCallback(() => {
	// 	subscribeToTimer((err: any, timestamp: any) => {
	// 		setTimeStamp(timestamp);
	// 	});
	// }, []);
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
				{/* <p>This is the timer value: {timeStamp}</p> */}
				<Loading />
			</Paper>
		</div>
	);
};

export default MainPage;
