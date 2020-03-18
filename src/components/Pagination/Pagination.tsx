import React from 'react';
import {
	Checkbox,
	FormControl,
	InputLabel,
	Select,
	Button,
	FormControlLabel,
	Typography,
} from '@material-ui/core';
import { PageInfo } from '../../interfaces';
import classes from './Pagination.module.scss';

interface Props {
	pageInfo: PageInfo;
	guest: boolean;
	needAdd: boolean;
	handleSelect: (event: React.ChangeEvent<{ value: number }>) => void;
	setNeedAdd: (needAdd: boolean) => void;
}

const Pagination: React.FC<Props> = ({
	pageInfo,
	guest,
	needAdd,
	handleSelect,
	setNeedAdd,
}) => {
	const elemPerPage = pageInfo.elemPerPage;
	const page = pageInfo.page;
	const firstPage = pageInfo.firstPage;
	const lastPage = pageInfo.lastPage;
	const countOfPhotos = pageInfo.countOfPhotos;
	const filter = pageInfo.filter;
	const setPage = pageInfo.setPage;
	const setFilter = pageInfo.setFilter;
	const countOfPages = Math.ceil(countOfPhotos / elemPerPage);

	return (
		<div className={classes.Pagination}>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel htmlFor="select-elements-per-page">
					К-во элементов
				</InputLabel>
				<Select
					className={classes.select}
					native
					value={elemPerPage}
					onChange={(event: any) => {
						handleSelect(event);
					}}
					inputProps={{
						name: 'elementsPerPage',
					}}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
				</Select>
			</FormControl>
			<Typography className={classes.pagesMessage}>
				Cтраница: {page}
				<br />
				из: {countOfPages === 0 ? 1 : countOfPages}
			</Typography>

			<Button
				disabled={firstPage}
				className={classes.pageButton}
				variant="contained"
				onClick={
					!firstPage
						? () => {
								setPage(page - 1);
						  }
						: () => {
								setPage(page);
						  }
				}
			>
				Prev
			</Button>
			<Button
				disabled={lastPage}
				className={classes.pageButton}
				variant="contained"
				onClick={
					!lastPage
						? () => {
								setPage(page + 1);
						  }
						: () => {
								setPage(page);
						  }
				}
			>
				Next
			</Button>
			<FormControlLabel
				className={classes.checkbox}
				control={
					<Checkbox
						checked={filter}
						onChange={() => {
							setFilter(!filter);
							setPage(1);
						}}
						color="primary"
					/>
				}
				label="Показать только квадратные фото"
			/>
			{guest ? null : (
				<Button
					className={classes.pageButton}
					variant="contained"
					onClick={() => {
						setNeedAdd(!needAdd);
					}}
				>
					{!needAdd ? 'Добавить фото' : 'Скрыть панель'}
				</Button>
			)}
		</div>
	);
};

export default Pagination;
