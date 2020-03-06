import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardMedia,
	IconButton,
	TextField,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import classes from './CardAvatar.module.scss';
import { User } from '../../interfaces';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Action, Dispatch } from 'redux';
import { setUserAvatar, setUserQuotes } from '../../store/users/users.actions';
import checkVoidObject from '../utils/checkVoidObject';

interface Props {
	user: User | null;
	guest: boolean;
	setUserAvatar: (file: object) => void;
	setUserQuotes: (quote: string) => void;
}

const CardAvatar: React.FC<Props> = ({
	user,
	guest,
	setUserAvatar,
	setUserQuotes,
}): JSX.Element => {
	if (user === null) {
		throw new Error('Юзера не найдено');
	}
	const [avatar, setAvatar] = useState(`${user.avatarUrl}`);
	const [sendAvatar, setSendAvatar] = useState({});
	const [edit, setEdit] = useState(false);
	const [newQuotes, setNewQuotes] = useState(user.quotes ? user.quotes : '');

	useEffect(() => {
		if (user) {
			setAvatar(`${user.avatarUrl}`);
		}
	}, [user._id, user.avatarUrl, user]);

	const avatarHandler = (event: any): void => {
		const file = event.target.files[0];
		setAvatar(URL.createObjectURL(file));
		setSendAvatar(file);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (!checkVoidObject(sendAvatar)) {
			setUserAvatar(sendAvatar);
		}
		if (newQuotes && newQuotes !== user.quotes) {
			setUserQuotes(newQuotes);
		}
		setEdit(false);
	};

	const handleInputChanges = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		event.preventDefault();
		setNewQuotes(event.target.value);
	};

	const editHandler = (event: any): void => {
		setEdit(true);
		if (edit) {
			submitHandler(event);
		}
	};
	if (user) {
		return (
			<Card className={classes.CardComponent}>
				<CardContent className={classes.cardContent}>
					<Typography className={classes.title} gutterBottom>
						Cyber-Хата сельчанина: <b>{user.firstName}</b>
					</Typography>
					<div className={classes.mediaContent}>
						<CardMedia
							className={classes.media}
							component="img"
							alt="Holop Avatar"
							height="350"
							src={avatar}
							title="My Avatar"
						/>
						{/*! Разобраться с фото !*/}
						{edit ? (
							<form
								onSubmit={submitHandler}
								action="/upload"
								method="post"
								encType="multipart/form-data"
								className={classes.form}
							>
								<input
									onChange={avatarHandler}
									accept="image/*"
									className={classes.input}
									id="icon-button-file"
									type="file"
									name="avatar"
								/>
								<label htmlFor="icon-button-file">
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
									>
										<PhotoCamera />
									</IconButton>
								</label>
							</form>
						) : null}
						{/*! Разобраться с фото !*/}
					</div>
					<Typography variant="h5" component="h2" className={classes.name}>
						{user.firstName}, {user.lastName} ({user.login})
					</Typography>
					<TextField
						disabled={!edit}
						label="Quotes: "
						multiline
						size="small"
						value={newQuotes}
						className={classes.quotes}
						onChange={handleInputChanges}
					/>
				</CardContent>
				<CardActions>
					{!guest ? (
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							size="small"
							onClick={editHandler}
						>
							{!edit ? 'Edit цитатку и Аву ёпт' : 'Сохранить Епт!'}
						</Button>
					) : null}
				</CardActions>
			</Card>
		);
	} else {
		return <div>Users not found</div>;
	}
};

const mapStateToProps = (state: RootState) => ({
	user: state.users.activeUser,
	guest: state.users.guest,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setUserAvatar: (avatar: object) => dispatch(setUserAvatar(avatar)),
	setUserQuotes: (quote: string) => dispatch(setUserQuotes(quote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardAvatar);
