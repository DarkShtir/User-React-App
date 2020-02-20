import React, { Component } from 'react';
import { ErrorIndicator } from '../shared/ErrorIndicator/ErrorIndicator';

interface State {
	hasError: boolean;
	errorObject: Error | null;
}
export class ErrorBoundry extends Component<{}, State> {
	state = {
		hasError: false,
		errorObject: null,
	};

	componentDidCatch(error: Error): void {
		console.log(error);
		this.setState({ errorObject: error });
		this.setState({ hasError: true });
	}

	render(): JSX.Element | React.ReactNode {
		if (this.state.hasError && this.state.errorObject) {
			console.log('Сработал оброботчик ошибок!');
			return <ErrorIndicator error={this.state.errorObject} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundry;
