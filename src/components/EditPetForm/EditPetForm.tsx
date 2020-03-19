import React, { Component } from 'react';
import { Container, Typography, Button } from '@material-ui/core';

import Form from '../shared/Form/Form';
import { Pet } from '../../interfaces';

import classes from './EditPetForm.module.scss';

interface Props {
	pet: Pet | null;
	onPetUpdated(id: string, pet: Pet): void;
	deletePet(petId: string): void;
}

interface State {
	pet: Pet;
}
export class EditPetForm extends Component<Props, State> {
	state = {
		pet: {
			_id: '',
			name: '',
			species: '',
			ownerId: '',
		},
	};

	submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		this.props.onPetUpdated(this.state.pet._id, this.state.pet);
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

	componentDidMount(): void {
		this.updateState();
	}

	updateState = (): void => {
		this.setState((): object => {
			return { pet: this.props.pet };
		});
	};

	handleDeletePet = (): void => {
		this.props.deletePet(this.state.pet._id);
	};

	petEditFormTemplate = {
		name: 'Имя',
		species: 'Вид',
	};

	render(): JSX.Element {
		return (
			<Container className={classes.EditPetForm}>
				<Typography variant="h3" align="center">
					Edit Pet
				</Typography>

				<Form
					targetObject={this.state.pet}
					inputHandler={this.handleInputChanges}
					onSubmit={this.submitHandler}
					formType={'edit'}
					templateForm={this.petEditFormTemplate}
				/>
				<Button onClick={this.handleDeletePet}>Удалить животинку</Button>
			</Container>
		);
	}
}
