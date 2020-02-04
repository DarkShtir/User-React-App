import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Typography } from '@material-ui/core';

const MainPage = (): JSX.Element => {
	return (
		<div>
			<Header />
			<Typography variant="h2" align="center">
				Добро пожаловать сюдысти!
			</Typography>
			<Footer />
		</div>
	);
};

export default MainPage;
