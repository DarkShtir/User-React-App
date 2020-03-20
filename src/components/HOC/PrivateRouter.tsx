import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
	isAuthenticated: boolean;
	authenticationPath: string;
}

export class PrivateRouter extends Route<ProtectedRouteProps> {
	render(): JSX.Element {
		let redirectPath = '';
		if (!this.props.isAuthenticated) {
			redirectPath = this.props.authenticationPath;
		}

		if (redirectPath) {
			const renderComponent = (): JSX.Element => (
				<Redirect to={{ pathname: redirectPath }} />
			);
			return (
				<Route {...this.props} component={renderComponent} render={undefined} />
			);
		} else {
			return <Route {...this.props} />;
		}
	}
}
