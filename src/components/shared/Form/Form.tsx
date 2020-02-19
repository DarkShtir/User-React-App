import React from 'react';
import Input from '../UI/Input/Input';
import { Button, ButtonGroup } from '@material-ui/core';
import classes from './Form.module.scss';
import { useHistory } from 'react-router-dom';

interface TemplateForm {
	[value: string]: string;
}

interface Props {
	user: { [value: string]: string | [] };
	inputHandler: (value: string, fieldName: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formType?: string;
	templateForm: TemplateForm;
}

const Form: React.FC<Props> = ({
	user,
	inputHandler,
	onSubmit,
	formType = 'add',
	templateForm,
}) => {
	const history = useHistory();

	const renderInputField = (
		formType: string,
		user: { [value: string]: any },
		templateForm: TemplateForm
	): object => {
		let cls: [string];
		if (formType === 'edit') {
			cls = ['active'];
		}
		return Object.keys(templateForm).map(
			// eslint-disable-next-line
			(fieldName, index): void | JSX.Element => {
				return (
					<React.Fragment key={fieldName + index}>
						<Input
							className={cls}
							targetObject={user}
							label={templateForm[fieldName]}
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
							fieldName={fieldName}
						/>
					</React.Fragment>
				);
			}
		);
	};
	const renderButtonGroup = (formType: string) => {
		if (formType === 'edit') {
			return (
				<ButtonGroup>
					<Button
						className={classes.button}
						color="primary"
						variant="outlined"
						type="submit"
					>
						Сохранить
					</Button>
					<Button
						className={classes.button}
						color="secondary"
						onClick={(): void => {
							history.goBack();
						}}
					>
						Отменить
					</Button>
				</ButtonGroup>
			);
		} else if (formType === 'login') {
			return (
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					type="submit"
				>
					Войти
				</Button>
			);
		} else {
			return (
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					type="submit"
				>
					Регистрация
				</Button>
			);
		}
	};

	return (
		<form className={classes.Form} onSubmit={onSubmit}>
			{renderInputField(formType, user, templateForm)}
			{renderButtonGroup(formType)}
		</form>
	);
};

export default Form;
