import React, { Component } from 'react';
import { ErrorIndicator } from '../shared/ErrorIndicator/ErrorIndicator';

export class ErrorBoundry extends Component {
	state = {
		hasError: false,
	};

	componentDidCatch(): void {
		this.setState({ hasError: true });
	}

	render(): JSX.Element | React.ReactNode {
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return this.props.children;
	}
}

export default ErrorBoundry;
