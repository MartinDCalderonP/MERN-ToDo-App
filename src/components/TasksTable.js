import React, { useState, useEffect } from 'react';
import URL from '../url';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Notification from './Notification';
import Swal from 'sweetalert2';

export default function TasksTable({ refreshTasks, handleGetTask }) {
	const useStyles = makeStyles((theme) => ({
		tableContainer: {
			flex: '0.6',
		},
	}));

	const classes = useStyles();

	const [tasks, setTasks] = useState(null);
	const [message, setMessage] = useState(false);

	useEffect(() => {
		getTasks();
	}, [refreshTasks]);

	const getTasks = () => {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => setTasks(data));
	};

	const handleEditButton = (taskId) => {
		handleGetTask(taskId);
	};

	const handleDeleteButton = (taskId) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`${URL}/${taskId}`, {
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.then((data) => {
						setMessage(data.status);
						getTasks();
					});
			}
		});
	};

	return (
		<>
			<TableContainer className={classes.tableContainer} component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Edit</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks?.map((task) => (
							<TableRow key={task._id}>
								<TableCell component="th" scope="row">
									{task.title}
								</TableCell>
								<TableCell>{task.description}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										size="small"
										onClick={() => handleEditButton(task._id)}
									>
										<EditIcon />
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										size="small"
										onClick={() => handleDeleteButton(task._id)}
									>
										<DeleteIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Notification message={message} />
		</>
	);
}
