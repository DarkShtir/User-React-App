import React, { useState } from 'react';
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

interface Props {
	user: User;
	guest: boolean;
	setUserAvatar: (file: object) => void;
	setUserQuotes: (quotes: string) => void;
}

const CardAvatar: React.FC<Props> = ({
	user,
	guest,
	setUserAvatar,
	setUserQuotes,
}): JSX.Element => {
	const [avatar, setAvatar] = useState(`${user.avatarUrl}`);
	const [sendAvatar, setSendAvatar] = useState();
	const [edit, setEdit] = useState(false);
	const [newQuotes, setNewQuotes] = useState(user.quotes ? user.quotes : '');
	const avatarHandler = (event: any): void => {
		const file = event.target.files[0];
		setAvatar(URL.createObjectURL(file));
		setSendAvatar(file);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		setUserAvatar(sendAvatar);
		if (newQuotes) {
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
};

export default CardAvatar;
