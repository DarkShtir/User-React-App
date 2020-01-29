import React from 'react';
import Input from '../UI/Input/Input';

export const EditForm: React.FC = () => {
	return (
		<div className="row center-align container">
			<h2>Edit User</h2>
			<form className="col s12 ">
				<Input value={' '} label={'Password'} type={'password'} />
				<Input value={' '} label={'First Name'} />
				<Input value={' '} label={'Last Name'} />
				<Input value={' '} label={'Nationality'} />
				<Input value={' '} label={'Phone'} type={'tel'} />
			</form>
			<button className="btn btn-large waves-effect waves-light deep-purple darken-2 center">
				Save Changes
			</button>
		</div>
	);
};
