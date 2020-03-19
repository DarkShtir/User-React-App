import React from 'react';
import Input from '../UI/Input/Input';
import { Button, ButtonGroup } from '@material-ui/core';
import classes from './Form.module.scss';
import { useHistory } from 'react-router-dom';

interface TemplateForm {
	[value: string]: string;
}

interface Props {
	targetObject: { [value: string]: string | [] };
	inputHandler: (value: string, fieldName: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formType?: string;
	templateForm: TemplateForm;
}

const Form: React.FC<Props> = ({
	targetObject,
	inputHandler,
	onSubmit,
	formType = 'add',
	templateForm,
}) => {
	const history = useHistory();

	const renderInputField = (
		formType: string,
		targetObject: { [value: string]: any },
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
							targetObject={targetObject}
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

	const renderButtonGroup = (formType: string): JSX.Element => {
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
					{history.location.pathname.match('edit') ? (
						<Button
							className={classes.button}
							color="secondary"
							onClick={(): void => {
								console.log(history.location);
								// if (history.location.pathname.match('edit')) {
								// } else {}
								history.goBack();
							}}
						>
							Отменить
						</Button>
					) : null}
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
			{renderInputField(formType, targetObject, templateForm)}
			{renderButtonGroup(formType)}
		</form>
	);
};

export default Form;
