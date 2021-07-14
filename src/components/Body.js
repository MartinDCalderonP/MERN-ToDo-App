import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormCard from './FormCard';
import TasksTable from './TasksTable';

export default function Body() {
	const useStyles = makeStyles((theme) => ({
		body: {
			display: 'flex',
			justifyContent: 'space-around',
			margin: '20px 20px 0px 0px',
		},
	}));

	const classes = useStyles();

	const [refreshTasks, setRefreshTasks] = useState(0);
	const [getTask, setGetTask] = useState(null);

	const onRefreshTasks = () => {
		setRefreshTasks(refreshTasks + 1);
	};

	const onGetTask = (task) => {
		setGetTask(task);
	};

	return (
		<div className={classes.body}>
			<FormCard handleRefreshTasks={onRefreshTasks} getTask={getTask} />
			<TasksTable refreshTasks={refreshTasks} handleGetTask={onGetTask} />
		</div>
	);
}
