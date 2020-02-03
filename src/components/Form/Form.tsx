import React from 'react';
import { User } from '../../interfaces';
import Input from '../UI/Input/Input';

interface Props {
	user: User;
	inputHandler: (value: string, fieldName: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formType?: string;
}

const Form: React.FC<Props> = ({
	user,
	inputHandler,
	onSubmit,
	formType = 'add',
}) => {
	const renderInputField = (formType: string): object => {
		const unusedFields = ['_id'];
		let cls: [string];
		if (formType === 'edit') {
			unusedFields.push('login', 'password', '__v', 'tokens');
			cls = ['active'];
		}
		return Object.keys(user).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				if (!unusedFields.includes(fieldName)) {
					return (
						<React.Fragment key={fieldName + index}>
							<Input
								className={cls}
								value={user}
								label={fieldName}
								type={
									fieldName === 'password'
										? fieldName
										: fieldName === 'phone'
										? 'tel'
										: ''
								}
								onChange={(event): void => {
									inputHandler(event.target.value, fieldName);
								}}
							/>
						</React.Fragment>
					);
				}
			}
		);
	};

	if (formType === 'edit') {
		return (
			<form className="col s12 " onSubmit={onSubmit}>
				{renderInputField(formType)}
				<button className="btn btn-large waves-effect waves-light deep-purple darken-2 center">
					Save Changes
				</button>
			</form>
		);
	} else {
		return (
			<form className="col s12 " onSubmit={onSubmit}>
				{renderInputField(formType)}
				<button className="btn-floating btn-large waves-effect waves-light yellow darken-4 center">
					Add
				</button>
			</form>
		);
	}
};

export default Form;
