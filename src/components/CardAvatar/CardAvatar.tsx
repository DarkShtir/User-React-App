import React, { useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardMedia,
	IconButton,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import classes from './CardAvatar.module.scss';
import { User } from '../../interfaces';

interface Props {
	user: User;
	guest: boolean;
}

const CardAvatar: React.FC<Props> = ({ user, guest }): JSX.Element => {
	const [avatar, setAvatar] = useState(user.avatarUrl);
	return (
		<Card className={classes.CardComponent}>
			<CardContent>
				<Typography className={classes.title} gutterBottom>
					Cyber-Хата сельчанина: <b>{user.firstName}</b>
				</Typography>
				<CardMedia
					className={classes.media}
					component="img"
					alt="Holop Avatar"
					height="350"
					// src={`http://localhost:8080/static/${user.avatarUrl}`}
					src={`http://localhost:8080/static/${avatar}`}
					title="My Avatar"
				/>
				{/*! Разобраться с фото !*/}
				<form
					// onSubmit={(e: any) => {
					// 	handleSubmit(e);
					// }}
					action="/upload"
					method="post"
					encType="multipart/form-data"
				>
					<input
						// onChange={handlerFiles}
						accept="image/*"
						className={classes.input}
						id="icon-button-file"
						type="file"
						name="avatar_"
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
				{/*! Разобраться с фото !*/}
				<Typography variant="h5" component="h2" className={classes.name}>
					{user.firstName}, {user.lastName} ({user.login})
				</Typography>
				<Typography className={classes.pos}>
					Цитатка про капусту, розы, и юных Хацкеров ХАРДКОД!!!
				</Typography>
			</CardContent>
			<CardActions>
				{!guest ? (
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						size="small"
						// disabled={guest}
					>
						Edit цитатку и Аву ёпт
					</Button>
				) : null}
			</CardActions>
		</Card>
	);
};

export default CardAvatar;
