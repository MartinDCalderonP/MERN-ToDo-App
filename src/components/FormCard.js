import React, { useState, useEffect } from 'react';
import URL from '../url';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	TextField,
	CardActions,
	Button,
} from '@material-ui/core';
import Notification from './Notification';

export default function FormCard({ handleRefreshTasks, getTask }) {
	const useStyles = makeStyles((theme) => ({
		form: {
			flex: '0.4',
		},
		card: {
			margin: '20px',
		},
		cardContent: {
			display: 'flex',
			flexDirection: 'column',
		},
		textField: {
			margin: '5px',
		},
		cardActions: {
			justifyContent: 'center',
		},
	}));

	const classes = useStyles();

	const [state, setState] = useState({
		title: '',
		description: '',
		_id: '',
	});
	const [message, setMessage] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let fetchURL = URL;
		let fetchMethod = 'POST';

		if (state._id) {
			fetchURL = `${URL}/${state._id}`;
			fetchMethod = 'PUT';
		}

		fetch(fetchURL, {
			method: fetchMethod,
			body: JSON.stringify(state),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setMessage(data.status);
				setState({ title: '', description: '', _id: '' });
				handleRefreshTasks(true);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getTask &&
			fetch(`${URL}/${getTask}`)
				.then((res) => res.json())
				.then((data) => {
					setState({
						title: data.title,
						description: data.description,
						_id: data._id,
					});
				});
	}, [getTask]);

	return (
		<>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<TextField
							className={classes.textField}
							id="standard-basic"
							label="Task Title"
							name="title"
							value={state.title}
							onChange={handleChange}
						/>
						<TextField
							className={classes.textField}
							id="standard-basic"
							label="Task Description"
							name="description"
							value={state.description}
							onChange={handleChange}
							multiline
						/>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Button variant="contained" color="primary" type="submit">
							{!state._id ? 'Send' : 'Update'}
						</Button>
					</CardActions>
				</Card>
			</form>
			<Notification message={message} />
		</>
	);
}
