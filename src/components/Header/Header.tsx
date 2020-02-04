import React from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';

const Header = (): JSX.Element => {
	return (
		<Paper>
			<Tabs
				variant="fullWidth"
				value="Menu"
				// onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="User List" />
				<Tab label="Registration" />
				<Tab label="Login" />
			</Tabs>
		</Paper>
	);
};

export default Header;
