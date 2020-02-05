import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.module.scss';
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
