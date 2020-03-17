import React, { Component } from 'react';
import { Typography, Container } from '@material-ui/core';

import { Pet } from '../../interfaces';
import Form from '../shared/Form/Form';

import classes from './CreatePetForm.module.scss';

interface Props {
	onPetAdded(pet: Pet): void;
	petAddToggle(): any;
}
interface State {
	pet: Pet;
}

export class CreatePetForm extends Component<Props, State> {
	state = {
		pet: {
			name: '',
			species: '',
		},
	};

	submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		this.props.onPetAdded(this.state.pet);
		this.setState({
			pet: {
				name: '',
				species: '',
			},
		});
		this.props.petAddToggle();
	};

	handleInputChanges = (value: string, fieldName: string): void => {
		const newPet: Pet = {
			...this.state.pet,
			[fieldName]: value,
		};
		this.setState(() => {
			return {
				pet: newPet,
			};
		});
	};

	petCreateFormTemplate = {
		name: 'Имя',
		species: 'Вид',
	};

	render(): JSX.Element {
		return (
			<Container className={classes.CreatePetForm}>
				<Typography variant="h3" align="center">
					Create Pet
				</Typography>
				<Form
					targetObject={this.state.pet}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					templateForm={this.petCreateFormTemplate}
				/>
			</Container>
		);
	}
}
