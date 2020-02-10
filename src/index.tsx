import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App/App';

import './index.module.scss';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';

ReactDOM.render(
	<ErrorBoundry>
		<Router>
			<App />
		</Router>
	</ErrorBoundry>,
	document.getElementById('root')
);
